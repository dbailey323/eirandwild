// js/site.js
// Mobile menu and footer year.

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open menu');
                toggle.focus();
            }
        });
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

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
