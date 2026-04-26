"use client";

import { useMemo, useState } from "react";

type Node = { id: string; text: string; choices: { text: string; nextId: string }[] };

export default function StoryApp({ props }: { props: Record<string, unknown> }) {
  const nodes = (props.nodes as Node[]) || [];
  const [currentId, setCurrentId] = useState(nodes[0]?.id || "");

  const current = useMemo(() => nodes.find((n) => n.id === currentId), [nodes, currentId]);

  if (!current) return <div className="card">Story is loading...</div>;

  return (
    <div className="card playful">
      <h3>Story Adventure</h3>
      <p>{current.text}</p>
      <div className="stack">
        {current.choices.map((choice) => (
          <button key={choice.text} className="bigButton" onClick={() => setCurrentId(choice.nextId)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
