// ===== Holiday Sands North - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initReservationForm();
    initRoomToggle();
    initSmoothScroll();
    setMinDates();
});

// ===== Mobile Navigation =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ===== Reservation Form =====
function initReservationForm() {
    const form = document.getElementById('reservation-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            const rooms = document.getElementById('rooms').value;

            // Validate dates
            if (!checkin || !checkout) {
                alert('Please select check-in and check-out dates.');
                return;
            }

            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);

            if (checkoutDate <= checkinDate) {
                alert('Check-out date must be after check-in date.');
                return;
            }

            // Format dates for Guest Desk (M/DD/YYYY)
            const formatDate = (date) => {
                const d = new Date(date);
                return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
            };

            const checkinFormatted = formatDate(checkin);
            const checkoutFormatted = formatDate(checkout);

            // Build Guest Desk URL
            const guestDeskUrl = `https://reservations.guestdesk.com/sites/HolidaySandsNorth?` +
                `checkin=${encodeURIComponent(checkinFormatted)}` +
                `&checkout=${encodeURIComponent(checkoutFormatted)}` +
                `&adults=${adults}` +
                `&children=${children}` +
                `&rooms=${rooms}` +
                `&lstChildAges=` +
                `&tollfree=` +
                `&FromSearchWidgetCalendar=1` +
                `&refLoc=` +
                `&saveFormData=1` +
                `&bookedOnrefLoc=#/room`;

            // Open Guest Desk in new tab
            window.open(guestDeskUrl, '_blank');
        });
    }
}

// ===== Set Minimum Dates for Date Inputs =====
function setMinDates() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDateInput = (date) => {
            return date.toISOString().split('T')[0];
        };

        checkinInput.min = formatDateInput(today);
        checkoutInput.min = formatDateInput(tomorrow);

        // Update checkout min when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const minCheckout = new Date(checkinDate);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutInput.min = formatDateInput(minCheckout);

            // If current checkout is before new min, update it
            if (new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = formatDateInput(minCheckout);
            }
        });
    }
}

// ===== Room View Toggle =====
function initRoomToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const oceanfrontRooms = document.getElementById('oceanfront-rooms');
    const streetRooms = document.getElementById('street-rooms');

    if (toggleBtns.length && oceanfrontRooms && streetRooms) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update button states
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Show/hide room grids
                const view = this.dataset.view;

                if (view === 'oceanfront') {
                    oceanfrontRooms.classList.add('active');
                    streetRooms.classList.remove('active');
                } else {
                    oceanfrontRooms.classList.remove('active');
                    streetRooms.classList.add('active');
                }
            });
        });
    }
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Get header height for offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Header Scroll Effect =====
(function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }

            lastScroll = currentScroll;
        });
    }
})();

// ===== Lazy Loading Images =====
(function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
})();

// ===== Animate on Scroll =====
(function() {
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe cards and sections
        document.querySelectorAll('.room-card, .amenity-card, .dining-card, .attraction-card, .policy-card, .nearby-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animateObserver.observe(el);
        });
    }
})();

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
