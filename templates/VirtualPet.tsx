"use client";

import { useState } from "react";

export default function VirtualPet({ props }: { props: Record<string, unknown> }) {
  const petEmoji = (props.petEmoji as string) || "🐱";
  const petName = (props.petName as string) || "Fluffy";
  const [hunger, setHunger] = useState(50);
  const [happy, setHappy] = useState(50);

  return (
    <div className="card playful">
      <h3>{petEmoji} {petName}</h3>
      <p>Hunger: {hunger}</p>
      <p>Happiness: {happy}</p>
      <div className="row">
        <button className="bigButton" onClick={() => setHunger((h) => Math.max(0, h - 10))}>Feed</button>
        <button className="bigButton" onClick={() => setHappy((h) => Math.min(100, h + 10))}>Play</button>
      </div>
    </div>
  );
}
