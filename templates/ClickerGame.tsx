"use client";

import { useEffect, useState } from "react";

export default function ClickerGame({ props }: { props: Record<string, unknown> }) {
  const character = (props.character as string) || "⭐";
  const target = (props.target as string) || "🫧";
  const duration = Number(props.seconds ?? 20);
  const goal = Number(props.goal ?? 10);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const done = timeLeft <= 0;

  return (
    <div className="card playful">
      <h3>{character} Clicker Game</h3>
      <p>Tap the target to score points!</p>
      <p>Time: {timeLeft}s | Score: {score}</p>
      <button disabled={done} className="bigButton" onClick={() => setScore((s) => s + 1)}>
        Tap {target}
      </button>
      {done && <p>{score >= goal ? "You win!" : "Try again!"}</p>}
    </div>
  );
}
