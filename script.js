document.addEventListener('DOMContentLoaded', () => {
    // Floating Lines Background
    const canvas = document.getElementById('floating-lines');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let lines = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initLines();
        };

        class Line {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.length = 100 + Math.random() * 300;
                this.speed = 0.5 + Math.random() * 1;
                this.opacity = 0.1 + Math.random() * 0.2;
                this.width = 1 + Math.random() * 2;
                this.color = Math.random() > 0.5 ? '255, 255, 255' : '161, 161, 170'; // white or muted
            }

            update() {
                this.x += this.speed;
                if (this.x > width) {
                    this.x = -this.length;
                    this.y = Math.random() * height;
                }
            }

            draw() {
                ctx.beginPath();
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
                gradient.addColorStop(0, `rgba(${this.color}, 0)`);
                gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(${this.color}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.width;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.length, this.y);
                ctx.stroke();
            }
        }

        const initLines = () => {
            lines = [];
            const lineCount = Math.floor(height / 20); // Density based on height
            for (let i = 0; i < lineCount; i++) {
                lines.push(new Line());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            lines.forEach(line => {
                line.update();
                line.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
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
