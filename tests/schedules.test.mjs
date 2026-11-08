import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const classesSource = readFileSync(new URL('../js/classes.js', import.meta.url), 'utf8');
const timetableSource = readFileSync(new URL('../js/timetable.js', import.meta.url), 'utf8');
const apiSource = readFileSync(new URL('../api/classes.js', import.meta.url), 'utf8');

function clock(now) {
    return class extends Date {
        constructor(...args) { super(...(args.length ? args : [now])); }
        static now() { return Date.parse(now); }
        toLocaleDateString(locale, options) {
            return super.toLocaleDateString(locale, { timeZone: 'America/Los_Angeles', ...options });
        }
        toLocaleTimeString(locale, options) {
            return super.toLocaleTimeString(locale, { timeZone: 'America/Los_Angeles', ...options });
        }
    };
}

function schedule(events, { now = '2026-11-08T12:00:00Z', card = 's6a88', ok = true } = {}) {
    const heading = { dataset: { classSchedule: card }, textContent: 'See Bookwhen for current dates and times' };
    const venue = { textContent: '', hidden: true };
    let ready;
    const errors = [];
    const context = {
        Date: clock(now),
        document: {
            addEventListener(name, callback) { ready = callback; },
            querySelectorAll() { return [heading]; },
            querySelector() { return venue; },
            getElementById() { return null; }
        },
        fetch: async () => ({ ok, status: ok ? 200 : 503, json: async () => events }),
        console: { error(...args) { errors.push(args); } }
    };
    runInNewContext(classesSource, context);
    return ready().then(() => ({ heading, venue, errors }));
}

function week(events) {
    const context = { Date: clock('2026-11-08T12:00:00Z'), document: { addEventListener() {} } };
    runInNewContext(timetableSource + '\nthis.subject = { buildWeek };', context);
    return [...context.subject.buildWeek(events).values()].flat();
}

const session = (startAt, extra = {}) => ({
    startAt, title: 'Baby Massage', eventId: 'ev-massage-exact',
    category: 'Baby Massage', venue: 'Rothley Centre', venueId: 'rothley', ...extra
});

test('schedule heading selects the earliest upcoming event and its actual venue', async () => {
    const result = await schedule([
        session('2026-11-20T12:00:00Z', { venue: 'Later venue' }),
        session('2026-11-01T12:00:00Z'),
        session('2026-11-10T18:30:00Z', { venue: 'New venue' })
    ]);
    assert.equal(result.heading.textContent, 'Next: Tuesday, 10 Nov at 18:30 (UK time)');
    assert.equal(result.venue.textContent, 'New venue');
    assert.equal(result.venue.hidden, false);
});

test('schedule heading uses UK summer time, regardless of visitor timezone', async () => {
    const result = await schedule([session('2026-07-09T23:30:00Z')], { now: '2026-07-01T12:00:00Z' });
    assert.equal(result.heading.textContent, 'Next: Friday, 10 Jul at 00:30 (UK time)');
});

test('schedule heading follows both UK clock changes', async () => {
    for (const [startAt, label] of [
        ['2026-03-29T00:30:00Z', 'Next: Sunday, 29 Mar at 00:30 (UK time)'],
        ['2026-03-29T01:30:00Z', 'Next: Sunday, 29 Mar at 02:30 (UK time)'],
        ['2026-10-25T00:30:00Z', 'Next: Sunday, 25 Oct at 01:30 (UK time)'],
        ['2026-10-25T01:30:00Z', 'Next: Sunday, 25 Oct at 01:30 (UK time)']
    ]) {
        const result = await schedule([session(startAt)], { now: '2026-01-01T00:00:00Z' });
        assert.equal(result.heading.textContent, label);
    }
});

test('past, starting-now, invalid and unrelated sessions never supply a heading', async () => {
    const result = await schedule([
        session('2026-11-08T11:00:00Z'), session('2026-11-08T12:00:00Z'),
        session('bad date'), session(null),
        session('2026-11-10T12:00:00Z', { title: 'Dance & Tone' }),
        session('2026-11-10T12:00:00Z', { eventId: null })
    ]);
    assert.equal(result.heading.textContent, 'Check Bookwhen for upcoming dates and times');
    assert.equal(result.venue.hidden, true);
});

test('missing physical venue stays hidden; online HIIT has a Zoom fallback', async () => {
    const physical = await schedule([session('2026-11-10T12:00:00Z', { venue: '' })]);
    assert.equal(physical.venue.hidden, true);
    const online = await schedule([session('2026-11-10T12:00:00Z', {
        title: 'HIIT Cardio', category: 'Online HIIT', venue: ''
    })], { card: 's2fwm' });
    assert.equal(online.venue.textContent, 'Live on Zoom');
    assert.equal(online.venue.hidden, false);
});

test('API failure leaves the general schedule guidance in place', async () => {
    const result = await schedule([], { ok: false });
    assert.equal(result.heading.textContent, 'See Bookwhen for current dates and times');
    assert.equal(result.venue.hidden, true);
    assert.equal(result.errors.length, 1);
});

test('same title and time at separate venues remain separate timetable entries', () => {
    const slots = week([
        session('2026-11-10T12:00:00Z'),
        session('2026-11-10T12:00:00Z', { venueId: 'mmc', venue: 'Memorial Centre' })
    ]);
    assert.equal(slots.length, 2);
});

test('venue IDs keep identically addressed locations separate', () => {
    const slots = week([
        session('2026-11-10T12:00:00Z'),
        session('2026-11-10T12:00:00Z', { venueId: 'other-room' })
    ]);
    assert.equal(slots.length, 2);
});

test('venue text still separates entries when location IDs are unavailable', () => {
    const slots = week([
        session('2026-11-10T12:00:00Z', { venueId: null }),
        session('2026-11-10T12:00:00Z', { venueId: null, venue: 'Memorial Centre' })
    ]);
    assert.equal(slots.length, 2);
});

test('weekly sessions at one venue collapse and retain nearest-session availability', () => {
    const slots = week([
        session('2026-11-17T12:00:00Z', { spacesLeft: 9 }),
        session('2026-11-10T12:00:00Z', { spacesLeft: 2 })
    ]);
    assert.equal(slots.length, 1);
    assert.equal(slots[0].dates.length, 2);
    assert.equal(slots[0].spacesLeft, 2);
    assert.equal(slots[0].alternate, false);
});

test('different categories stay separate and expired timetable events are excluded', () => {
    const slots = week([
        session('2026-11-10T12:00:00Z'),
        session('2026-11-10T12:00:00Z', { category: 'Motherhood' }),
        session('2026-11-08T12:00:00Z'), session('2026-11-01T12:00:00Z'),
        session('invalid'), session('2027-06-01T12:00:00Z')
    ]);
    assert.equal(slots.length, 2);
});

test('API carries the Bookwhen location ID and address into the event response', async () => {
    const context = {
        process: { env: { BOOKWHEN_API_KEY: 'test-key' } }, Buffer,
        console: { error() {} },
        fetch: async () => ({
            ok: true,
            json: async () => ({
                data: [{
                    id: 'ev-massage-exact', attributes: { title: 'Baby Massage', start_at: '2026-11-10T12:00:00Z' },
                    relationships: { location: { data: { id: 'rothley' } } }
                }],
                included: [{ id: 'rothley', type: 'location', attributes: { address_text: 'Rothley Centre' } }]
            })
        })
    };
    runInNewContext(apiSource.replace('export default ', '') + '\nthis.subject = { handler };', context);
    let payload;
    const response = { setHeader() {}, status() { return this; }, json(data) { payload = data; } };
    await context.subject.handler({}, response);
    assert.equal(payload[0].venueId, 'rothley');
    assert.equal(payload[0].venue, 'Rothley Centre');
});
