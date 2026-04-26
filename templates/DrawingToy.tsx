"use client";

import { useRef, useState, type MouseEvent } from "react";

export default function DrawingToy() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#ff4d6d");

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas || e.buttons !== 1) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  const clear = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="card playful">
      <h3>Drawing Toy</h3>
      <div className="row">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button className="bigButton" onClick={clear}>Clear</button>
      </div>
      <canvas ref={ref} onMouseMove={draw} width={320} height={220} className="canvas" />
      <p>Hold and drag to draw.</p>
    </div>
  );
}
