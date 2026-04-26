"use client";

import { useEffect, useState } from "react";
import AppPreview from "@/components/AppPreview";
import KidEditor from "@/components/KidEditor";
import LearningPanel from "@/components/LearningPanel";
import ParentPanel from "@/components/ParentPanel";
import PromptBox from "@/components/PromptBox";
import { generateProjectFromPrompt } from "@/lib/generateProject";
import { ProjectSchema } from "@/types/project";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [project, setProject] = useState<ProjectSchema | undefined>(undefined);

  const generate = async (nextPrompt?: string) => {
    const promptToUse = (nextPrompt ?? prompt).trim();
    setLoading(true);
    setError("");

    const data = await generateProjectFromPrompt(promptToUse);
    setLoading(false);

    if (!data.ok) {
      setError(data.reason || "Could not build that app yet.");
      return;
    }

    setProject(data.project);
  };

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search).get("prompt") || "";
    if (!qp) return;
    setPrompt(qp);
    void generate(qp);
    // intentionally only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      <PromptBox prompt={prompt} setPrompt={setPrompt} onSubmit={() => void generate()} loading={loading} />
      {error && <div className="card error">{error}</div>}
      <AppPreview project={project} />
      <KidEditor project={project} onUpdate={setProject} />
      <LearningPanel project={project} />
      <ParentPanel project={project} onDelete={() => setProject(undefined)} />
    </main>
  );
}
