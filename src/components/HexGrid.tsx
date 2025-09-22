import { useEffect, useRef } from "react";

export const HexGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagon grid parameters
    const hexRadius = 20;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;
    const vertDist = hexHeight;
    const horizDist = (3/4) * hexWidth;

    const cols = Math.ceil(canvas.width / horizDist) + 2;
    const rows = Math.ceil(canvas.height / vertDist) + 2;

    const drawHexagon = (x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + hexRadius * Math.cos(angle);
        const py = y + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(168, 85, 247, 0.03)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current scroll position
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate grid offset based on scroll
      const startRow = Math.floor(scrollY / vertDist) - 2;
      const endRow = Math.ceil((scrollY + canvas.height) / vertDist) + 2;

      // Draw static hexagon grid
      for (let row = startRow; row < endRow; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * horizDist;
          const y = row * vertDist + (col % 2) * (vertDist / 2) - scrollY;
          
          // Skip if hexagon is outside viewport
          if (y < -hexRadius || y > canvas.height + hexRadius) continue;
          
          drawHexagon(x, y);
        }
      }
    };

    draw();
    window.addEventListener('scroll', draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', draw);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
};