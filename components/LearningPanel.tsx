import { ProjectSchema } from "@/types/project";

export default function LearningPanel({ project }: { project?: ProjectSchema }) {
  if (!project) return null;

  return (
    <div className="card">
      <h2>Learning Layer</h2>
      <p><strong>What you made:</strong> {project.description}</p>
      <p><strong>How it works:</strong> Buttons change values like score, choices change screens, and timers make games exciting.</p>
      <p><strong>Try changing this:</strong> Change one rule and test what happens!</p>
      <ul>
        {project.learningConcepts.map((concept) => <li key={concept}>{concept}</li>)}
      </ul>
    </div>
  );
}
