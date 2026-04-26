"use client";

import { useState } from "react";

type Q = { q: string; options: string[]; answer: number };

export default function QuizApp({ props }: { props: Record<string, unknown> }) {
  const questions = (props.questions as Q[]) || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (questions.length === 0) return <div className="card">No questions yet.</div>;
  const current = questions[index];
  const done = index >= questions.length;

  if (done) return <div className="card"><h3>Great job!</h3><p>Score: {score}/{questions.length}</p></div>;

  return (
    <div className="card playful">
      <h3>Quiz Time</h3>
      <p>{current.q}</p>
      <div className="stack">
        {current.options.map((option, i) => (
          <button
            key={option}
            className="bigButton"
            onClick={() => {
              if (i === current.answer) setScore((s) => s + 1);
              setIndex((x) => x + 1);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
