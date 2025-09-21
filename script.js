document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle for mobile
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('nav');
    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            navbar.classList.toggle('active');
        };
    }

    // Close menu when a nav link is clicked
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks && navbar) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside of it on mobile
    window.addEventListener('click', (e) => {
        if (navbar && menuIcon && navbar.classList.contains('active')) {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
            }
        }
    });

    // Header hide on scroll logic
    let lastScroll = 0;
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Also close the mobile menu if it's open and user starts scrolling
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hide'); // Hide on scroll down
            } else {
                header.classList.remove('hide'); // Show on scroll up
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        });
    }

    // Typing effect logic
    const typingTextElement = document.querySelector('.typing-text span');
    if (typingTextElement) {
        const professions = [
            "Software Engineer",
            "UI/UX Designer",
            "Data Scientist",
            "AI Enthusiast",
            "Front-End Developer",
            "Web Developer",
            "Tech Explorer"
        ];
        let professionIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < professions[professionIndex].length) {
                typingTextElement.textContent += professions[professionIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
            } else {
                setTimeout(erase, 1000); // Wait 1 second before erasing
            }
        }

        function erase() {
            if (charIndex > 0) {
                typingTextElement.textContent = professions[professionIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50); // Adjust erasing speed here
            } else {
                professionIndex = (professionIndex + 1) % professions.length; // Move to the next profession
                setTimeout(type, 500); // Wait 0.5 seconds before typing the next one
            }
        }
        // Note: index.html also loads the 'typed.js' library, which may conflict.
        // This will only run if 'typed.js' fails or is removed.
        if (typeof Typed === 'undefined') {
            type();
        }
    }
});