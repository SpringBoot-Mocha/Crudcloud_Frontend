import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size and regenerate particles when resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recompute particle count based on new size; limit on mobile
      const baseCount = Math.max(40, Math.floor((canvas.width * canvas.height) / (1600 * 300)));
      const isMobile = window.innerWidth < 768;
      const newCount = isMobile ? Math.min(baseCount, 30) : baseCount;

      // Adjust existing particles array length
      while (particles.length > newCount) particles.pop();
      while (particles.length < newCount) particles.push(new Particle());
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system (brand colors)
    const particles = [];
    const particleCount = Math.max(40, Math.floor((canvas.width * canvas.height) / (1600 * 300))); // density based on viewport size

    // Brand color palette (greens/teal)
    const brandColors = ['#14b8a6', '#0d9488', '#0f766e', '#115e59'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        const hex = brandColors[Math.floor(Math.random() * brandColors.length)];
        // convert hex to rgba with subtle alpha
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const a = Math.random() * 0.18 + 0.06; // 0.06 - 0.24
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles (initial particleCount computed above via resize)
    // (resizeCanvas already created initial particles)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            // brand main color (~#14b8a6) with varying alpha
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.18 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;