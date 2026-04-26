"use client";

import { useState } from "react";
import { ProjectSchema } from "@/types/project";

export default function ParentPanel({ project, onDelete }: { project?: ProjectSchema; onDelete: () => void }) {
  const [enabled, setEnabled] = useState(false);

  if (!project) return null;

  return (
    <div className="card">
      <label className="row">
        <input type="checkbox" checked={enabled} onChange={() => setEnabled((v) => !v)} />
        Parent / Teacher mode
      </label>
      {enabled && (
        <>
          <p><strong>Project summary:</strong> {project.title} ({project.appType})</p>
          <p><strong>Learning concepts:</strong> {project.learningConcepts.join(", ")}</p>
          <p><strong>COPPA-aware design:</strong> no unnecessary personal data, consent flow placeholder, private-only sharing.</p>
          <div className="row">
            <button className="bigButton">Export privately</button>
            <button className="bigButton danger" onClick={onDelete}>Delete project</button>
          </div>
        </>
      )}
    </div>
  );
}
