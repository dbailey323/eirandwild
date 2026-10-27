// js/class-config.js
// The one place that describes Eir & Wild's classes.
//
// Bookwhen sessions are matched to a class by their title, so a new course or
// term in Bookwhen appears on the website automatically, whatever its reference.
//   match: words that must ALL appear in the Bookwhen title (not case-sensitive).
//          The first class that matches wins, so more specific classes go first.
//   refs:  optional Bookwhen schedule references (the "sXXXX" part of an event ID),
//          kept as a backup in case a title doesn't contain the words above.
//
// To add a brand-new type of class: add an entry here, then add a card for it on
// its class page with data-class="<key>".

window.EW_GROUPS = {
    motherhood: {
        label: 'Motherhood',
        page: '/leicester/fitnessclasses/motherhoodclasses',
        bookwhen: 'https://bookwhen.com/eirandwild-motherhood'
    },
    womanhood: {
        label: 'Womanhood',
        page: '/leicester/fitnessclasses/womanhoodclasses',
        bookwhen: 'https://bookwhen.com/eirandwild-womanhood'
    },
    hiit: {
        label: 'Online HIIT',
        page: '/leicester/fitnessclasses/hiit',
        bookwhen: 'https://bookwhen.com/eirandwild-womanhood'
    },
    babymassage: {
        label: 'Baby Massage',
        page: '/leicester/babymassage/babymassage',
        bookwhen: 'https://bookwhen.com/eirandwild-motherhood'
    }
};

window.EW_CLASSES = [
    { key: 'monday-double', name: 'Monday Double', group: 'womanhood', match: ['double'], refs: ['s8zbt'] },
    { key: 'dance-tone', name: 'Dance & Tone', group: 'womanhood', match: ['dance'], refs: ['s1pcc'] },
    { key: 'strong-stretched', name: 'Strong & Stretched', group: 'womanhood', match: ['stretched'], refs: ['szawo'] },
    { key: 'strong-mummy', name: 'The Strong Mummy Movement', group: 'motherhood', match: ['strong mummy'], refs: ['smgsv'] },
    { key: 'bums-tums', name: 'Strong Mums, Bums & Tums', group: 'motherhood', match: ['bums'], refs: ['shphg'] },
    { key: 'strong-women', name: 'Strong Women Squad', group: 'motherhood', match: ['strong women'], refs: ['sz1aw'] },
    { key: 'hiit-cardio', name: 'HIIT Cardio', group: 'hiit', match: ['hiit', 'cardio'], refs: ['s2fwm'] },
    { key: 'hiit-strength', name: 'HIIT Strength', group: 'hiit', match: ['hiit', 'strength'], refs: ['snu8o'] },
    // Booking the first session books the whole 4-week course, so only that date is shown
    { key: 'baby-massage', name: 'Baby Massage & Mummy Relaxation', group: 'babymassage', match: ['massage'], refs: ['s6a88'], course: true }
];
