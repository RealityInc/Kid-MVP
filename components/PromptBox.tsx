"use client";

interface PromptBoxProps {
  prompt: string;
  setPrompt: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

const EXAMPLES = [
  "Make a game where a shark eats submarines",
  "Make a pet care app",
  "Make a quiz about dinosaurs",
];

export default function PromptBox({ prompt, setPrompt, onSubmit, loading }: PromptBoxProps) {
  return (
    <div className="card">
      <h1>What do you want to make?</h1>
      <textarea
        className="promptInput"
        placeholder="Type your app idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="stack">
        {EXAMPLES.map((example) => (
          <button key={example} className="chip" onClick={() => setPrompt(example)}>
            {example}
          </button>
        ))}
      </div>
      <button className="bigButton" onClick={onSubmit} disabled={loading}>
        {loading ? "Building..." : "Build my app"}
      </button>
      <p className="note">For parents/teachers: kid-safe filters are always on. No public chat, no sharing by default.</p>
    </div>
  );
}
