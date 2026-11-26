import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../js/classes.js', import.meta.url), 'utf8');
const event = (startAt, extra = {}) => ({
    title: 'Baby Massage', className: 's6a88', startAt,
    eventId: 'ev-s6a88-exact-bookwhen-id',
    bookingPlatformUrl: 'https://bookwhen.com/eirandwild-motherhood',
    color: '#000562', ...extra
});

async function render(events, {
    now = '2026-11-08T12:00:00Z', firstOnly = false,
    visitorZone = 'America/Los_Angeles', ok = true, fail = false, hideable = []
} = {}) {
    class Clock extends Date {
        constructor(...args) { super(...(args.length ? args : [now])); }
        static now() { return Date.parse(now); }
        toLocaleDateString(locale, options) {
            return super.toLocaleDateString(locale, { timeZone: visitorZone, ...options });
        }
    }
    let fallback = true;
    const slots = [];
    const container = {
        dataset: { firstOnly: String(firstOnly) },
        querySelector(selector) {
            if (selector === '.fallback-booking-link') {
                return fallback ? { remove() { fallback = false; } } : null;
            }
            return null;
        },
        appendChild(slot) { slots.push(slot); }
    };
    let ready;
    const errors = [];
    runInNewContext(source, {
        Date: Clock,
        document: {
            getElementById(id) { return id.startsWith('classDates') ? container : null; },
            addEventListener(name, callback) { ready = callback; },
            querySelectorAll(selector) {
                return selector === '[data-hide-after]' ? hideable : [];
            },
            createElement(tag) {
                return {
                    tag, style: {}, attributes: {}, children: [],
                    setAttribute(key, value) { this.attributes[key] = value; },
                    appendChild(child) { this.children.push(child); }
                };
            }
        },
        fetch: async () => {
            if (fail) throw new Error('Offline');
            return { ok, status: ok ? 200 : 503, json: async () => events };
        },
        console: { error(...args) { errors.push(args); } }
    });
    await ready();
    // Date buttons sit inside block groups; walk them in page order
    const all = [];
    const walk = (node) => { all.push(node); (node.children || []).forEach(walk); };
    slots.forEach(walk);
    const links = all.filter(node => node.tag === 'a');
    const headings = all.filter(node => node.className === 'class-block-title');
    const badges = all.filter(node => node.className === 'class-block-new');
    return { links, headings, badges, fallback, errors };
}

test('UK date and exact booking ID stay the same for visitors abroad', async () => {
    for (const visitorZone of ['America/Los_Angeles', 'Asia/Tokyo', 'Europe/London']) {
        const { links } = await render([event('2026-11-10T00:30:00Z')], { visitorZone });
        assert.equal(links[0].innerHTML, '10 Nov');
        assert.equal(links[0].attributes.href,
            'https://bookwhen.com/eirandwild-motherhood#focus=ev-s6a88-exact-bookwhen-id');
    }
});

test('UK summer dates stay correct across UTC midnight', async () => {
    const { links } = await render([event('2026-07-09T23:30:00Z')], {
        now: '2026-07-01T12:00:00Z'
    });
    assert.equal(links[0].innerHTML, '10 Jul');
});

test('both UK clock changes preserve the UK date', async () => {
    for (const startAt of [
        '2026-03-29T00:30:00Z', '2026-03-29T01:30:00Z',
        '2026-10-25T00:30:00Z', '2026-10-25T01:30:00Z'
    ]) {
        const { links } = await render([event(startAt)], { now: '2026-01-01T00:00:00Z' });
        assert.equal(links[0].innerHTML, startAt.includes('03-29') ? '29 Mar' : '25 Oct');
    }
});

test('past and starting-now sessions are hidden; later today remains', async () => {
    const { links } = await render([
        event('2026-11-08T11:59:59Z'), event('2026-11-08T12:00:00Z'),
        event('2026-11-08T12:00:01Z')
    ]);
    assert.equal(links.length, 1);
    assert.equal(links[0].innerHTML, '8 Nov');
});

test('invalid timestamps and missing event IDs preserve the fallback', async () => {
    const { links, fallback } = await render([
        event(null), event('invalid'), event('2026-11-10T12:00:00Z', { eventId: null })
    ]);
    assert.equal(links.length, 0);
    assert.equal(fallback, true);
});

test('first-only cards choose the earliest upcoming session from unsorted events', async () => {
    const { links, fallback } = await render([
        event('2026-11-20T12:00:00Z'), event('2026-11-01T12:00:00Z'),
        event('2026-11-10T12:00:00Z')
    ], { firstOnly: true });
    assert.equal(links.length, 1);
    assert.equal(links[0].innerHTML, '10 Nov');
    assert.equal(fallback, false);
});

test('empty results keep the general booking fallback', async () => {
    const result = await render([]);
    assert.equal(result.fallback, true);
    assert.equal(result.links.length, 0);
});

test('HTTP and network failures preserve fallback booking', async () => {
    for (const options of [{ ok: false }, { fail: true }]) {
        const result = await render([event('2026-11-10T12:00:00Z')], options);
        assert.equal(result.fallback, true);
        assert.equal(result.links.length, 0);
        assert.equal(result.errors.length, 1);
    }
});

test('full and low-space sessions retain availability labels', async () => {
    const { links } = await render([
        event('2026-11-10T12:00:00Z', { spacesLeft: 0 }),
        event('2026-11-11T12:00:00Z', { spacesLeft: 2 })
    ]);
    assert.equal(links[0].attributes['aria-label'], '10 Nov: fully booked, join the waiting list');
    assert.equal(links[1].attributes['aria-label'], '11 Nov: 2 spaces left');
});

test('each block gets its own sub-title and later blocks are marked new', async () => {
    const { links, headings, badges } = await render([
        event('2026-11-20T12:00:00Z', { title: '❄️💪The Strong Mummy Movement - Winter 2026 💪❄️' }),
        event('2027-01-06T10:30:00Z', { title: '🎉💪The Strong Mummy Movement - New Year 2027 💪🎉' }),
        event('2026-11-27T12:00:00Z', { title: '❄️💪The Strong Mummy Movement - Winter 2026 💪❄️' })
    ]);
    assert.deepEqual(headings.map(h => h.textContent), ['Winter 2026', 'New Year 2027']);
    assert.equal(badges.length, 1);
    assert.deepEqual(links.map(l => l.innerHTML), ['20 Nov', '27 Nov', '6 Jan']);
});

test('titles without a dated block name get no sub-title', async () => {
    const { headings, links } = await render([
        event('2026-11-28T09:30:00Z', { title: '😅 HIIT 😅 - STRENGTH' }),
        event('2026-11-30T18:30:00Z', { title: '💃 Dance&Tone 💃' })
    ]);
    assert.equal(headings.length, 0);
    assert.equal(links.length, 2);
});

test('first-only cards show the start date of every upcoming course', async () => {
    const { links, headings } = await render([
        event('2026-11-27T10:30:00Z', { title: '👶 Baby Massage & Mummy Relaxation - Nov/Dec 2026 👶', spacesLeft: 0 }),
        event('2026-12-04T10:30:00Z', { title: '👶 Baby Massage & Mummy Relaxation - Nov/Dec 2026 👶', spacesLeft: 0 }),
        event('2027-01-08T10:45:00Z', { title: '👶 Baby Massage & Mummy Relaxation - January 2027 👶' }),
        event('2027-01-15T10:45:00Z', { title: '👶 Baby Massage & Mummy Relaxation - January 2027 👶' }),
        event('2027-02-26T10:45:00Z', { title: '👶 Baby Massage & Mummy Relaxation - Feb/March 2027 👶' })
    ], { firstOnly: true });
    assert.deepEqual(links.map(l => l.innerHTML), ['27 Nov', '8 Jan', '26 Feb']);
    assert.deepEqual(headings.map(h => h.textContent), ['Nov/Dec 2026', 'January 2027', 'Feb/March 2027']);
});

test('finished class cards are removed once their hide-after time passes', async () => {
    const removed = [];
    const card = (hideAfter) => ({ dataset: { hideAfter }, remove() { removed.push(hideAfter); } });
    await render([], {
        now: '2026-12-17T00:00:00Z',
        hideable: [card('2026-12-17T00:00:00Z'), card('2027-01-01T00:00:00Z')]
    });
    assert.deepEqual(removed, ['2026-12-17T00:00:00Z']);
});
