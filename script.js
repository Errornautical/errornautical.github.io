import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBrain() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw central "brain" circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
      ctx.strokeStyle = "#0ff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animate particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
      style={{ scale, opacity }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.h1 className="text-white text-5xl font-bold z-10" animate={{ y: [0, -100] }}>
        Neural Motion
      </motion.h1>
    </motion.div>
  );
}
