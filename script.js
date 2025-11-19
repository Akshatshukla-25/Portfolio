

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

        const rows = 150;
        const cols = 100;

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'grid-row';

            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';

                // Add hover effect
                cell.addEventListener('mouseenter', () => {
                    const color = getRandomColor();
                    cell.style.setProperty('--grid-hover-color', color);
                    cell.style.backgroundColor = color;
                });

                cell.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        cell.style.backgroundColor = 'transparent';
                    }, 2000);
                });

                // Add cross SVG to every other cell
                if (j % 2 === 0 && i % 2 === 0) {
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('fill', 'none');
                    svg.setAttribute('viewBox', '0 0 24 24');
                    svg.setAttribute('stroke-width', '1.5');
                    svg.setAttribute('stroke', 'currentColor');

                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    path.setAttribute('d', 'M12 6v12m6-6H6');

                    svg.appendChild(path);
                    cell.appendChild(svg);
                }

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

    // Click Spark Animation
    document.addEventListener('click', (e) => {
        const sparkCount = 12;
        const colors = [
            'rgb(125, 211, 252)', // sky-300
            'rgb(249, 168, 212)', // pink-300
            'rgb(134, 239, 172)', // green-300
            'rgb(253, 224, 71)',  // yellow-300
            'rgb(252, 165, 165)', // red-300
            'rgb(216, 180, 254)', // purple-300
        ];

        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';

            // Random position near cursor
            spark.style.left = `${e.pageX}px`;
            spark.style.top = `${e.pageY}px`;

            // Random color
            spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random direction
            const angle = (i / sparkCount) * 360 + Math.random() * 30;
            const velocity = 20 + Math.random() * 40;

            const tx = Math.cos(angle * Math.PI / 180) * velocity;
            const ty = Math.sin(angle * Math.PI / 180) * velocity;

            spark.style.setProperty('--tx', `${tx}px`);
            spark.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(spark);

            // Remove after animation
            setTimeout(() => {
                spark.remove();
            }, 800);
        }
    });
});
