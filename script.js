document.addEventListener('DOMContentLoaded', () => {
    // Animated Grid Background
    const gridBackground = document.querySelector('.grid-background');
    if (gridBackground) {
        const colors = [
            'rgba(125, 211, 252, 0.5)', // sky-300
            'rgba(249, 168, 212, 0.5)', // pink-300
            'rgba(134, 239, 172, 0.5)', // green-300
            'rgba(253, 224, 71, 0.5)',  // yellow-300
            'rgba(252, 165, 165, 0.5)', // red-300
            'rgba(216, 180, 254, 0.5)', // purple-300
            'rgba(147, 197, 253, 0.5)', // blue-300
        ];

        const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        // Optimized grid size for performance
        const rows = 50;
        const cols = 50;

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';

            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';

                // Smoother hover effect
                cell.addEventListener('mouseenter', () => {
                    const color = getRandomColor();
                    cell.style.backgroundColor = color;
                    cell.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
                    cell.style.transition = 'background-color 0s, box-shadow 0s';
                });

                cell.addEventListener('mouseleave', () => {
                    cell.style.transition = 'background-color 1s ease, box-shadow 1s ease';
                    cell.style.backgroundColor = 'transparent';
                    cell.style.boxShadow = 'none';
                });

                row.appendChild(cell);
            }
            gridContainer.appendChild(row);
        }
        gridBackground.appendChild(gridContainer);
    }

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = "First Year Student & Aspiring Developer";
        let index = 0;

        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50); // Typing speed
            }
        }

        // Start typing after a small delay
        setTimeout(type, 1000);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements we want to animate
    const animatedElements = document.querySelectorAll('.section-title, .skill-card, .project-card, .about-text, .contact-text, .footer');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add staggered delay for cards
        if (el.classList.contains('skill-card') || el.classList.contains('project-card')) {
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
    });

    // Also observe existing fade-in elements (like in hero)
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Project Card Mouse Tracking Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
