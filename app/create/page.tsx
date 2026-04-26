"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AppPreview from "@/components/AppPreview";
import KidEditor from "@/components/KidEditor";
import LearningPanel from "@/components/LearningPanel";
import ParentPanel from "@/components/ParentPanel";
import PromptBox from "@/components/PromptBox";
import { generateProjectFromPrompt } from "@/lib/generateProject";
import { ProjectSchema } from "@/types/project";

export default function CreatePage() {
  const params = useSearchParams();
  const initialPrompt = params.get("prompt") || "";
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [project, setProject] = useState<ProjectSchema | undefined>(undefined);

  const generate = async () => {
    setLoading(true);
    setError("");

    const data = await generateProjectFromPrompt(prompt);
    setLoading(false);

    if (!data.ok) {
      setError(data.reason || "Could not build that app yet.");
      return;
    }

    setProject(data.project);
  };

  useEffect(() => {
    if (initialPrompt) generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      <PromptBox prompt={prompt} setPrompt={setPrompt} onSubmit={generate} loading={loading} />
      {error && <div className="card error">{error}</div>}
      <AppPreview project={project} />
      <KidEditor project={project} onUpdate={setProject} />
      <LearningPanel project={project} />
      <ParentPanel project={project} onDelete={() => setProject(undefined)} />
    </main>
  );
}
