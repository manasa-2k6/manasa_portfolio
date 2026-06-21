/**
 * ==========================================================================
 * Portfolio Interactivity & Animations - Kanchibatla Sri Laxmi Manasa
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Management (Dark / Light Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Check for saved theme, default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            htmlElement.classList.add('light');
            htmlElement.classList.remove('dark');
        }
    }


    // --- 2. Scroll Progress Bar & Navbar Scroll State ---
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('mainNavbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar
        scrollProgress.style.width = scrollPercent + '%';

        // Shrink/expand navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide scroll-to-top button
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to Top action
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 3. Dynamic Typewriter Effect ---
    const typedTextSpan = document.getElementById('typed-text');
    const roles = [
        "Computer Science Engineering (AI & ML) Student",
        "Aspiring Software Developer",
        "Competitive Programmer",
        "AI/ML Enthusiast"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newRoleDelay = 2000; // Delay between roles
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newRoleDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Start Typewriter
    if (roles.length) setTimeout(type, 1000);


    // --- 4. Scroll Reveal Animations & Nav Link Highlighter ---
    const reveals = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    const sections = document.querySelectorAll('section, header');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });

    // Active navigation highlighting
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px' // Focus middle viewport
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // --- 5. Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-strip');
    const statNums = document.querySelectorAll('.stat-num');
    let countersStarted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                statNums.forEach(num => {
                    const target = parseFloat(num.getAttribute('data-val'));
                    const decimals = parseInt(num.getAttribute('data-decimals')) || 0;
                    const duration = 2000; // 2 seconds
                    const frameDuration = 1000 / 60; // 60 fps
                    const totalFrames = Math.round(duration / frameDuration);
                    let frame = 0;

                    const countUp = () => {
                        frame++;
                        const progress = frame / totalFrames;
                        // Ease out quad
                        const easeProgress = progress * (2 - progress);
                        const currentVal = target * easeProgress;
                        
                        const hasPlus = num.getAttribute('data-val').includes('+');
                        num.textContent = currentVal.toFixed(decimals) + (hasPlus ? '+' : '');
                        
                        if (frame < totalFrames) {
                            requestAnimationFrame(countUp);
                        } else {
                            num.textContent = target.toFixed(decimals) + (hasPlus ? '+' : '');
                        }
                    };
                    
                    countUp();
                });
            }
        });
    }, {
        threshold: 0.5
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }



    // --- 7. Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button and show loading state
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

            // Simulate form submission
            setTimeout(() => {
                // Reset form state
                contactForm.reset();
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane ms-2"></i>';
                
                // Show success alert
                formSuccessAlert.classList.remove('d-none');
                
                // Hide alert after 5 seconds
                setTimeout(() => {
                    formSuccessAlert.classList.add('d-none');
                }, 5000);
            }, 1500);
        });
    }


    // --- 8. Premium 3D Tilt Effect on Cards ---
    const tiltCards = document.querySelectorAll('.glass-card-hover');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within element
            const y = e.clientY - rect.top;  // y coordinate within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (max 8 degrees for elegant feel)
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            // Set style
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transition and tilt
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });


    // --- 9. Byte the DevBot Interactive Controller ---
    const pet = document.getElementById('dev-pet');
    const bubble = pet ? pet.querySelector('.pet-bubble') : null;
    const petTrack = document.getElementById('pet-track');
    
    if (pet && petTrack) {
        let petX = 0;
        let petDir = 1; // 1 = walking right, -1 = walking left
        const petSpeed = 0.8; // pixels per frame
        let isPetWalking = true;
        let isJumping = false;
        
        // Dynamic dialog prompts
        const developerThoughts = [
            "Hi, I'm Byte! 🤖",
            "Refactoring the codebase...",
            "Solving DSA problems on CodeChef...",
            "Compiling neural network layers...",
            "Training ML model for 100 epochs...",
            "Need more coffee... ☕",
            "Writing clean Python structures!",
            "I love AI and Web Development! 💻",
            "Checking out Manasa's portfolio... 🌟",
            "No compiler errors! Today is a good day.",
            "Import tensorflow as tf...",
            "Have you tried scrolling up?",
            "ACE Engineering College rules! 🎓"
        ];

        const clickResponses = [
            "BEEP BOOP! Ready to code! ⚡",
            "Ouch! That tickles! 😂",
            "Yawwwn! Coding overnight...",
            "Let's build something awesome! 🚀",
            "Neural network fully trained! 🧠",
            "Hello! I am Byte, your friendly assistant."
        ];

        // Position the pet initially
        pet.style.left = petX + 'px';

        // Main animation loop for walking
        function walkPet() {
            if (!isPetWalking || isJumping) {
                requestAnimationFrame(walkPet);
                return;
            }
            
            // Get current track width
            const trackWidth = petTrack.clientWidth;
            const petWidth = pet.clientWidth || 70;
            const maxRight = trackWidth - petWidth;

            // Move pet
            petX += petSpeed * petDir;
            pet.style.left = petX + 'px';

            // Check boundaries
            if (petX >= maxRight && petDir === 1) {
                // Reach right edge, turn around
                petDir = -1;
                pet.style.transform = 'scaleX(-1)';
                if (bubble) bubble.style.transform = 'translateX(-50%) scaleX(-1) scale(0)';
            } else if (petX <= 0 && petDir === -1) {
                // Reach left edge, turn around
                petDir = 1;
                pet.style.transform = 'scaleX(1)';
                if (bubble) bubble.style.transform = 'translateX(-50%) scaleX(1) scale(0)';
            }

            requestAnimationFrame(walkPet);
        }

        // Start walking loop
        requestAnimationFrame(walkPet);

        // Dialogue bubbles cycle
        function showBubble(text, duration = 4000) {
            if (!bubble) return;
            
            // Set text and show bubble
            bubble.textContent = text;
            bubble.classList.add('visible');
            
            // Re-apply correct direction scaling to speech bubble text (prevent text mirror)
            if (petDir === -1) {
                bubble.style.transform = 'translateX(-50%) scaleX(-1) scale(1)';
            } else {
                bubble.style.transform = 'translateX(-50%) scaleX(1) scale(1)';
            }

            setTimeout(() => {
                bubble.classList.remove('visible');
            }, duration);
        }

        // Cycle random developer thoughts every 12 to 18 seconds
        function cycleThoughts() {
            if (isJumping) {
                setTimeout(cycleThoughts, 5000);
                return;
            }
            const randomDelay = Math.random() * 6000 + 12000;
            setTimeout(() => {
                if (isPetWalking) {
                    const randomThought = developerThoughts[Math.floor(Math.random() * developerThoughts.length)];
                    showBubble(randomThought);
                }
                cycleThoughts();
            }, randomDelay);
        }
        cycleThoughts();

        // Immediate click interaction
        pet.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid other triggers
            if (isJumping) return;
            
            isJumping = true;
            pet.classList.remove('walking');
            pet.classList.add('jumping');
            
            // Show click reaction
            const randomClickText = clickResponses[Math.floor(Math.random() * clickResponses.length)];
            showBubble(randomClickText, 3000);

            // Reset jump state after CSS animation finishes (0.8s)
            setTimeout(() => {
                pet.classList.remove('jumping');
                pet.classList.add('walking');
                isJumping = false;
            }, 800);
        });

        // Hover behavior (pet pauses and looks at you)
        pet.addEventListener('mouseenter', () => {
            if (isJumping) return;
            isPetWalking = false;
            pet.classList.remove('walking');
            // Little wave or look up
            showBubble("Oh, hello there! 👀", 2000);
        });

        pet.addEventListener('mouseleave', () => {
            if (isJumping) return;
            isPetWalking = true;
            pet.classList.add('walking');
        });
    }
});
