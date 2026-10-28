// js/site.js
// Header that tightens on scroll, desktop dropdowns, the phone menu sheet
// fallback for browsers without the Popover API, and the footer year.

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Desktop dropdowns also open on click/tap, for touch screens and keyboards
    document.querySelectorAll('.nav-group-label').forEach((button) => {
        button.addEventListener('click', () => {
            const group = button.closest('.nav-group');
            const open = group.classList.toggle('open');
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    document.addEventListener('click', (event) => {
        document.querySelectorAll('.nav-group.open').forEach((group) => {
            if (!group.contains(event.target)) {
                group.classList.remove('open');
                group.querySelector('.nav-group-label').setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Menu sheet: the Popover API handles opening, closing, Escape and the backdrop.
    // Older browsers get the same behaviour with a class toggle.
    const sheet = document.getElementById('menu-sheet');
    if (sheet && typeof sheet.showPopover !== 'function') {
        const toggle = (open) => {
            sheet.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        };
        document.querySelectorAll('[popovertarget="menu-sheet"]').forEach((button) => {
            button.addEventListener('click', () => {
                toggle(button.getAttribute('popovertargetaction') === 'hide' ? false : !sheet.classList.contains('open'));
            });
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') toggle(false);
        });
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
