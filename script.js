document.addEventListener('DOMContentLoaded', () => {
    // Animated Grid Background
    const gridBackground = document.querySelector('.grid-background');
    if (gridBackground) {
        const colors = [
            'rgb(125, 211, 252)', // sky-300
            'rgb(249, 168, 212)', // pink-300
            'rgb(134, 239, 172)', // green-300
            'rgb(253, 224, 71)',  // yellow-300
            'rgb(252, 165, 165)', // red-300
            'rgb(216, 180, 254)', // purple-300
            'rgb(147, 197, 253)', // blue-300
            'rgb(165, 180, 252)', // indigo-300
            'rgb(196, 181, 253)', // violet-300
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
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .skill-card, .project-card, .about-text').forEach(el => {
        el.classList.add('fade-in'); // Add class initially to hide
        el.style.opacity = '0'; // Ensure hidden
        el.style.animation = 'none'; // Reset animation
        observer.observe(el);

        // Re-enable animation when in view
        el.addEventListener('animationstart', () => {
            el.style.opacity = '1';
        });
    });

    // Fix for the observer logic to actually trigger animation
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .skill-card, .project-card, .about-text').forEach(el => {
        fadeObserver.observe(el);
    });
});
