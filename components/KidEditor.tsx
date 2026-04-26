"use client";

import { ProjectSchema } from "@/types/project";

interface KidEditorProps {
  project?: ProjectSchema;
  onUpdate: (next: ProjectSchema) => void;
}

export default function KidEditor({ project, onUpdate }: KidEditorProps) {
  if (!project) return null;

  const updateProps = (key: string, value: unknown) => {
    onUpdate({ ...project, templateProps: { ...project.templateProps, [key]: value } });
  };

  return (
    <div className="card">
      <h2>Kid Editor</h2>
      <div className="grid2">
        <label>Change character
          <input value={String(project.templateProps.character ?? "⭐")} onChange={(e) => updateProps("character", e.target.value)} />
        </label>
        <label>Change background
          <input value={String(project.templateProps.background ?? "Ocean")} onChange={(e) => updateProps("background", e.target.value)} />
        </label>
        <label>Change goal
          <input type="number" value={Number(project.templateProps.goal ?? 10)} onChange={(e) => updateProps("goal", Number(e.target.value))} />
        </label>
        <label>Add sound
          <input value={String(project.templateProps.sound ?? "Pop")} onChange={(e) => updateProps("sound", e.target.value)} />
        </label>
        <label>Make easier/harder
          <input type="range" min={1} max={30} value={Number(project.templateProps.seconds ?? 20)} onChange={(e) => updateProps("seconds", Number(e.target.value))} />
        </label>
        <label>Add level/question/page
          <input value={String(project.templateProps.extra ?? "New challenge")} onChange={(e) => updateProps("extra", e.target.value)} />
        </label>
      </div>
      <label>Ask AI to change it
        <textarea placeholder="Make the game about space cats." onBlur={(e) => updateProps("aiRequest", e.target.value)} />
      </label>
    </div>
  );
}
