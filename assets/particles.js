document.addEventListener('DOMContentLoaded', function() {
    const particlesCanvas = document.getElementById('particles-js');
    const ctx = particlesCanvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with enhanced features
    class Particle {
        constructor() {
            this.reset();
            // Initialize at random positions
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
        }

        reset() {
            // Enhanced particle properties
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 3;  // Larger size range
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.3;
            // Add color variation with purple theme
            this.color = Math.random() < 0.8 ? 'white' : (Math.random() < 0.5 ? '#9370DB' : '#B19CD9');
            // Add twinkle effect
            this.twinkleSpeed = Math.random() * 0.02;
            this.twinkleDirection = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Twinkle effect
            this.opacity += this.twinkleSpeed * this.twinkleDirection;
            if (this.opacity >= 1) {
                this.twinkleDirection = -1;
            } else if (this.opacity <= 0.3) {
                this.twinkleDirection = 1;
            }

            // Wrap around screen
            if (this.x > particlesCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particlesCanvas.width;
            if (this.y > particlesCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particlesCanvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;

            // Add glow effect
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = this.color;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Reset shadow
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
    }

    // Create more particles for a denser star field
    const particles = [];
    const particleCount = 200;  // Increased from 100

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});