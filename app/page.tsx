"use client";

import { useState } from "react";
import AppPreview from "@/components/AppPreview";
import KidEditor from "@/components/KidEditor";
import LearningPanel from "@/components/LearningPanel";
import ParentPanel from "@/components/ParentPanel";
import { generateProjectFromPrompt } from "@/lib/generateProject";
import { ProjectSchema } from "@/types/project";

const EXAMPLES = [
  "Make a game where a shark eats submarines",
  "Make a pet care app",
  "Make a quiz about dinosaurs",
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [project, setProject] = useState<ProjectSchema | undefined>();

  const onGenerate = async () => {
    setLoading(true);
    setError("");

    const result = await generateProjectFromPrompt(prompt);

    setLoading(false);
    if (!result.ok) {
      setError(result.reason || "Could not generate yet.");
      return;
    }

    setProject(result.project);
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Lovable for Kids</h1>
        <p>What do you want to make?</p>

        <textarea
          className="promptInput"
          placeholder="Make a game, story, quiz, tracker, or drawing toy..."
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

        <button className="bigButton" disabled={loading} onClick={onGenerate}>
          {loading ? "Building..." : "Build my app"}
        </button>

        <p className="note">
          Parent/teacher note: kid-safe filtering is enabled. No public chat, no external links, no user messaging.
        </p>
      </section>

      {error && <div className="card error">{error}</div>}

      <AppPreview project={project} />
      <KidEditor project={project} onUpdate={setProject} />
      <LearningPanel project={project} />
      <ParentPanel project={project} onDelete={() => setProject(undefined)} />
    </main>
  );
}
