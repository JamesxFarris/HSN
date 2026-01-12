// ===== Holiday Sands North - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initReservationForm();
    initRoomToggle();
    initResponsiveRooms();
    initViewMore();
    initSmoothScroll();
    setMinDates();
    initAttractionSlideshows();
    initUpcomingEvents();
});

// ===== Upcoming Local Events =====
function initUpcomingEvents() {
    const eventsContainer = document.getElementById('events-container');
    const viewMoreBtn = document.getElementById('view-more-events');
    const monthFilter = document.getElementById('event-month-filter');
    if (!eventsContainer) return;

    // Annual Myrtle Beach events (month is 0-indexed: 0=Jan, 11=Dec)
    // These events auto-update each year - past events show next year's dates
    const annualEvents = [
        {
            name: "Beach Ball Drop",
            description: "Ring in the New Year with a giant beach ball drop at Broadway at the Beach.",
            month: 0, day: 1,
            endMonth: 0, endDay: 1,
            url: "https://www.broadwayatthebeach.com/events/"
        },
        {
            name: "Myrtle Beach Marathon",
            description: "Annual marathon and half-marathon along the beautiful Grand Strand coastline.",
            month: 2, day: 1,
            endMonth: 2, endDay: 3,
            url: "https://www.myrtlebeachmarathon.com/"
        },
        {
            name: "Canadian-American Days",
            description: "Celebrating the friendship between Canada and America with special events and deals.",
            month: 2, day: 10,
            endMonth: 2, endDay: 20,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/canadian-american-days/"
        },
        {
            name: "St. Patrick's Day Parade",
            description: "One of the largest St. Patrick's Day parades on the East Coast down Ocean Boulevard.",
            month: 2, day: 17,
            endMonth: 2, endDay: 17,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Myrtle Beach Bike Week Spring Rally",
            description: "Thousands of motorcycle enthusiasts gather for the legendary spring rally.",
            month: 4, day: 8,
            endMonth: 4, endDay: 17,
            url: "https://www.myrtlebeachbikeweek.com/"
        },
        {
            name: "Blue Crab Festival",
            description: "Celebrate the blue crab with food, live music, and family fun in Little River.",
            month: 4, day: 17,
            endMonth: 4, endDay: 18,
            url: "https://www.bluecrabfestival.org/"
        },
        {
            name: "Carolina Country Music Fest",
            description: "The largest outdoor country music festival on the East Coast at the beach.",
            month: 5, day: 5,
            endMonth: 5, endDay: 8,
            url: "https://carolinacountrymusicfest.com/"
        },
        {
            name: "Sun Fun Festival",
            description: "Kick off summer with parades, concerts, and beach activities along the Grand Strand.",
            month: 5, day: 1,
            endMonth: 5, endDay: 4,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "July 4th Fireworks",
            description: "Spectacular fireworks displays along the beach and at Broadway at the Beach.",
            month: 6, day: 4,
            endMonth: 6, endDay: 4,
            url: "https://www.broadwayatthebeach.com/events/"
        },
        {
            name: "Hot Summer Nights",
            description: "Free summer concert series at Broadway at the Beach every Thursday night.",
            month: 5, day: 15,
            endMonth: 7, endDay: 31,
            url: "https://www.broadwayatthebeach.com/events/"
        },
        {
            name: "Myrtle Beach Bike Week Fall Rally",
            description: "The fall edition of the famous motorcycle rally along the Grand Strand.",
            month: 8, day: 25,
            endMonth: 9, endDay: 4,
            url: "https://www.myrtlebeachbikeweek.com/"
        },
        {
            name: "Oktoberfest",
            description: "German food, craft beer, live music, and fun at the Myrtle Beach Boardwalk.",
            month: 9, day: 15,
            endMonth: 9, endDay: 17,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Irish Italian International Festival",
            description: "A celebration of Irish and Italian heritage with food, music, and culture.",
            month: 8, day: 22,
            endMonth: 8, endDay: 24,
            url: "https://www.irishitalianfestival.com/"
        },
        {
            name: "Thanksgiving Weekend",
            description: "Family activities, holiday shopping, and festive celebrations along the Grand Strand.",
            month: 10, day: 25,
            endMonth: 10, endDay: 30,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Night of a Thousand Candles",
            description: "Brookgreen Gardens illuminated by thousands of candles and holiday lights.",
            month: 11, day: 1,
            endMonth: 11, endDay: 31,
            url: "https://www.brookgreen.org/calendar"
        },
        {
            name: "Myrtle Beach Holiday Lights",
            description: "Drive-through holiday light displays and festive celebrations at the Speedway.",
            month: 10, day: 15,
            endMonth: 11, endDay: 31,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "SOS Spring Safari",
            description: "The legendary shag dancing festival at Ocean Drive Beach with live bands and dancing.",
            month: 3, day: 18,
            endMonth: 3, endDay: 27,
            url: "https://www.shagdance.com/sos/"
        },
        {
            name: "Myrtle Beach Pelicans Opening Day",
            description: "Minor league baseball season kicks off at Pelicans Ballpark - family fun all summer!",
            month: 3, day: 8,
            endMonth: 3, endDay: 8,
            url: "https://www.milb.com/myrtle-beach"
        },
        {
            name: "Atalaya Arts & Crafts Festival",
            description: "Fine arts and crafts festival at historic Atalaya Castle in Huntington Beach State Park.",
            month: 8, day: 27,
            endMonth: 8, endDay: 28,
            url: "https://www.atalayafestival.com/"
        },
        {
            name: "SOS Fall Migration",
            description: "The fall edition of the famous shag dancing festival at Ocean Drive Beach.",
            month: 8, day: 15,
            endMonth: 8, endDay: 24,
            url: "https://www.shagdance.com/sos/"
        },
        {
            name: "Coastal Uncorked Food & Wine Festival",
            description: "Celebrate local cuisine and wines from around the world at North Beach.",
            month: 4, day: 1,
            endMonth: 4, endDay: 3,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Beach Boogie & BBQ",
            description: "BBQ competition, live beach music, and family activities at the Boardwalk.",
            month: 10, day: 7,
            endMonth: 10, endDay: 9,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Myrtle Beach Classic",
            description: "Premier college basketball tournament featuring top NCAA teams.",
            month: 10, day: 21,
            endMonth: 10, endDay: 24,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Labor Day Beach Bash",
            description: "End summer with fireworks, live music, and beach activities along the Grand Strand.",
            month: 8, day: 1,
            endMonth: 8, endDay: 3,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Memorial Day Weekend",
            description: "Kick off summer with beach events, live entertainment, and fireworks.",
            month: 4, day: 24,
            endMonth: 4, endDay: 27,
            url: "https://www.visitmyrtlebeach.com/things-to-do/events/"
        },
        {
            name: "Pawleys Island Festival of Music & Art",
            description: "Weekend of live music and art exhibitions in charming Pawleys Island.",
            month: 9, day: 10,
            endMonth: 9, endDay: 12,
            url: "https://www.pawleysmusic.com/"
        },
        {
            name: "World Famous Crab Races",
            description: "Weekly crab racing at Broadway at the Beach - fun for all ages!",
            month: 5, day: 1,
            endMonth: 7, endDay: 31,
            url: "https://www.broadwayatthebeach.com/events/"
        }
    ];

    const today = new Date();
    const currentYear = today.getFullYear();

    // Create event objects with actual dates
    function getEventsWithDates() {
        const eventsWithDates = [];

        annualEvents.forEach(event => {
            // Create date for this year
            let startDate = new Date(currentYear, event.month, event.day);
            let endDate = new Date(currentYear, event.endMonth, event.endDay);

            // If the event has already passed this year, show next year's date
            if (endDate < today) {
                startDate = new Date(currentYear + 1, event.month, event.day);
                endDate = new Date(currentYear + 1, event.endMonth, event.endDay);
            }

            eventsWithDates.push({
                ...event,
                startDate,
                endDate
            });
        });

        // Sort by start date
        eventsWithDates.sort((a, b) => a.startDate - b.startDate);
        return eventsWithDates;
    }

    let allEvents = getEventsWithDates();
    let initialCount = window.innerWidth > 768 ? 6 : 4;
    let displayCount = initialCount;
    let currentFilter = 'upcoming';

    // Update display count on resize
    window.addEventListener('resize', function() {
        const newInitial = window.innerWidth > 768 ? 6 : 4;
        if (newInitial !== initialCount && displayCount === initialCount) {
            initialCount = newInitial;
            displayCount = newInitial;
            renderEvents();
        }
        initialCount = newInitial;
    });

    function renderEventCard(event) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const startMonth = monthNames[event.startDate.getMonth()];
        const startDay = event.startDate.getDate();
        const endDay = event.endDate.getDate();

        // Format the day display
        let dayDisplay = startDay;
        if (startDay !== endDay || event.startDate.getMonth() !== event.endDate.getMonth()) {
            dayDisplay = `${startDay}-${endDay}`;
        }

        return `
            <a href="${event.url}" target="_blank" rel="noopener" class="event-card">
                <div class="event-date">
                    <span class="month">${startMonth}</span>
                    <span class="day">${dayDisplay}</span>
                </div>
                <div class="event-info">
                    <h4>${event.name}</h4>
                    <p>${event.description}</p>
                </div>
            </a>
        `;
    }

    function getFilteredEvents() {
        if (currentFilter === 'upcoming') {
            return allEvents;
        } else if (currentFilter === 'all') {
            // Sort by month for "all events" view
            return [...allEvents].sort((a, b) => a.month - b.month);
        } else {
            // Filter by specific month
            const filterMonth = parseInt(currentFilter);
            return allEvents.filter(event => event.month === filterMonth);
        }
    }

    function renderEvents() {
        const filteredEvents = getFilteredEvents();
        const eventsToShow = filteredEvents.slice(0, displayCount);

        if (eventsToShow.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">No events found for this month.</p>';
        } else {
            eventsContainer.innerHTML = eventsToShow.map(renderEventCard).join('');
        }

        // Show/hide view more button
        if (viewMoreBtn) {
            if (filteredEvents.length > displayCount) {
                viewMoreBtn.style.display = 'inline-block';
                viewMoreBtn.textContent = `View More Events (${filteredEvents.length - displayCount} more)`;
            } else if (displayCount > initialCount && filteredEvents.length > initialCount) {
                viewMoreBtn.style.display = 'inline-block';
                viewMoreBtn.textContent = 'Show Less';
            } else {
                viewMoreBtn.style.display = 'none';
            }
        }
    }

    // Initial render
    renderEvents();

    // View more button click handler
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const filteredEvents = getFilteredEvents();
            const increment = window.innerWidth > 768 ? 6 : 4;
            if (displayCount >= filteredEvents.length) {
                displayCount = initialCount;
            } else {
                displayCount = Math.min(displayCount + increment, filteredEvents.length);
            }
            renderEvents();
        });
    }

    // Month filter change handler
    if (monthFilter) {
        monthFilter.addEventListener('change', function() {
            currentFilter = this.value;
            displayCount = initialCount; // Reset display count when filter changes
            renderEvents();
        });
    }
}

// ===== Mobile Navigation =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        function toggleMenu() {
            const isActive = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            // Prevent body scroll when fullscreen menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });

        // Close menu when clicking outside (on the menu background)
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                closeMenu();
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
            const rooms = 1; // Default to 1 room

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
    const oceanfrontViewMore = document.getElementById('oceanfront-view-more');
    const oceanfrontMoreRooms = document.getElementById('oceanfront-more-rooms');
    const streetViewMore = document.getElementById('street-view-more');

    // Hide street view more button by default (oceanfront is default view)
    if (streetViewMore) streetViewMore.style.display = 'none';

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
                    // Show oceanfront View More, hide street View More
                    if (oceanfrontViewMore) oceanfrontViewMore.style.display = 'block';
                    if (streetViewMore) streetViewMore.style.display = 'none';
                } else {
                    oceanfrontRooms.classList.remove('active');
                    streetRooms.classList.add('active');
                    // Hide oceanfront View More and extra rooms, show street View More
                    if (oceanfrontViewMore) oceanfrontViewMore.style.display = 'none';
                    if (oceanfrontMoreRooms) oceanfrontMoreRooms.classList.remove('show');
                    if (streetViewMore) streetViewMore.style.display = 'block';
                }
            });
        });
    }
}

// ===== Responsive Room Display =====
function initResponsiveRooms() {
    // Setup for Oceanfront rooms
    setupRoomSection({
        roomsId: 'oceanfront-rooms',
        moreRoomsId: 'oceanfront-more-rooms',
        buttonSelector: '.view-more-btn[data-target="oceanfront-more-rooms"]',
        label: 'Oceanfront'
    });

    // Setup for Street View rooms
    setupRoomSection({
        roomsId: 'street-rooms',
        moreRoomsId: null,
        buttonSelector: '.view-more-btn[data-target="street-rooms"]',
        label: 'Street'
    });
}

function setupRoomSection(config) {
    const roomsContainer = document.getElementById(config.roomsId);
    const moreRoomsContainer = config.moreRoomsId ? document.getElementById(config.moreRoomsId) : null;
    const viewMoreBtn = document.querySelector(config.buttonSelector);

    if (!roomsContainer || !viewMoreBtn) return;

    const roomCards = roomsContainer.querySelectorAll('.room-card');
    const moreRoomCards = moreRoomsContainer ? moreRoomsContainer.querySelectorAll('.room-card') : [];

    let initialCount = window.innerWidth > 768 ? 6 : 4;
    let showingAll = false;

    function updateVisibility() {
        // Show/hide room cards based on count
        roomCards.forEach((card, index) => {
            if (index < initialCount || showingAll) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide more rooms section if exists
        if (moreRoomsContainer) {
            if (showingAll) {
                moreRoomsContainer.classList.add('show');
            } else {
                moreRoomsContainer.classList.remove('show');
            }
        }

        // Update button text
        const hiddenInitial = Math.max(0, roomCards.length - initialCount);
        const totalHidden = showingAll ? 0 : hiddenInitial + moreRoomCards.length;

        if (showingAll) {
            viewMoreBtn.innerHTML = 'Show Less';
        } else if (totalHidden > 0) {
            viewMoreBtn.innerHTML = `View More ${config.label} Rooms<br><span class="btn-subtext">(${totalHidden} more)</span>`;
        }

        // Show/hide button
        if (totalHidden === 0 && !showingAll) {
            viewMoreBtn.style.display = 'none';
        } else {
            viewMoreBtn.style.display = 'inline-block';
        }
    }

    // Initial render
    updateVisibility();

    // Handle resize
    window.addEventListener('resize', function() {
        const newInitial = window.innerWidth > 768 ? 6 : 4;
        if (newInitial !== initialCount) {
            initialCount = newInitial;
            if (!showingAll) {
                updateVisibility();
            }
        }
    });

    // View more button click
    viewMoreBtn.addEventListener('click', function() {
        showingAll = !showingAll;
        updateVisibility();

        if (showingAll) {
            setTimeout(() => {
                const firstHiddenCard = roomCards[initialCount] || (moreRoomsContainer ? moreRoomsContainer.querySelector('.room-card') : null);
                if (firstHiddenCard) {
                    firstHiddenCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    });
}

// ===== View More Rooms Toggle (Legacy - kept for street view) =====
function initViewMore() {
    // Room view more is now handled by initResponsiveRooms
    // This function kept for any other view-more buttons
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
    const headerTop = document.querySelector('.header-top');
    let lastScroll = 0;

    if (header && headerTop) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }

            // Collapse blue bar on scroll - triggers when scrolled past 50px
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

// ===== Attraction Slideshows =====
function initAttractionSlideshows() {
    const slideshows = document.querySelectorAll('.attraction-slideshow');
    const slideshowData = [];
    let globalInterval;
    let isPaused = false;

    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = slideshow.querySelector('.slide-dots');
        let currentIndex = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slide-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(data, index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.slide-dot');

        const data = {
            slideshow,
            slides,
            dots,
            currentIndex
        };

        slideshowData.push(data);

        // Pause on hover
        slideshow.addEventListener('mouseenter', () => { isPaused = true; });
        slideshow.addEventListener('mouseleave', () => { isPaused = false; });
    });

    function goToSlide(data, index) {
        data.slides[data.currentIndex].classList.remove('active');
        data.dots[data.currentIndex].classList.remove('active');
        data.currentIndex = index;
        data.slides[data.currentIndex].classList.add('active');
        data.dots[data.currentIndex].classList.add('active');
    }

    function nextAllSlides() {
        if (isPaused) return;
        slideshowData.forEach(data => {
            const nextIndex = (data.currentIndex + 1) % data.slides.length;
            goToSlide(data, nextIndex);
        });
    }

    // Sync all slideshows - advance together every 4 seconds
    globalInterval = setInterval(nextAllSlides, 4000);
}

// ===== Scroll to Top Button =====
(function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();
