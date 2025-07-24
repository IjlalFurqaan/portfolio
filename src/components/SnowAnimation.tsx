import React, { useEffect, useRef, useCallback } from 'react';

interface SnowAnimationProps {
  particleCount?: number;
  enabled?: boolean;
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

const SnowAnimation: React.FC<SnowAnimationProps> = ({ 
  particleCount = 200, 
  enabled = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const snowflakesRef = useRef<Snowflake[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createSnowflake = useCallback((width: number, height: number): Snowflake => ({
    x: Math.random() * width,
    y: Math.random() * height - height,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 0.5,
    drift: Math.random() * 2 - 1,
    opacity: Math.random() * 0.8 + 0.2
  }), []);

  const initSnowflakes = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    snowflakesRef.current = Array.from({ length: particleCount }, () =>
      createSnowflake(width, height)
    );
  }, [particleCount, createSnowflake]);

  const updateSnowflake = useCallback((snowflake: Snowflake, width: number, height: number) => {
    // Update position
    snowflake.y += snowflake.speed;
    snowflake.x += snowflake.drift * 0.5;
    
    // Mouse interaction (subtle)
    const mouseInfluence = 50;
    const dx = mouseRef.current.x - snowflake.x;
    const dy = mouseRef.current.y - snowflake.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouseInfluence) {
      const force = (mouseInfluence - distance) / mouseInfluence;
      snowflake.x -= (dx / distance) * force * 0.5;
      snowflake.y -= (dy / distance) * force * 0.5;
    }
    
    // Reset snowflake if it goes off screen
    if (snowflake.y > height + 10) {
      snowflake.y = -10;
      snowflake.x = Math.random() * width;
    }
    
    if (snowflake.x > width + 10) {
      snowflake.x = -10;
    } else if (snowflake.x < -10) {
      snowflake.x = width + 10;
    }
  }, []);

  const drawSnowflake = useCallback((
    ctx: CanvasRenderingContext2D, 
    snowflake: Snowflake
  ) => {
    ctx.save();
    ctx.globalAlpha = snowflake.opacity;
    ctx.fillStyle = '#ffffff';
    
    // Simple circle for better performance
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    if (!enabled || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with slight trail effect for smooth animation
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw snowflakes
    snowflakesRef.current.forEach(snowflake => {
      updateSnowflake(snowflake, canvas.width, canvas.height);
      drawSnowflake(ctx, snowflake);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [enabled, updateSnowflake, drawSnowflake]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSnowflakes();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, animate, initSnowflakes]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default SnowAnimation;