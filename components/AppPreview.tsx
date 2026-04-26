import ClickerGame from "@/templates/ClickerGame";
import DrawingToy from "@/templates/DrawingToy";
import QuizApp from "@/templates/QuizApp";
import StoryApp from "@/templates/StoryApp";
import VirtualPet from "@/templates/VirtualPet";
import { ProjectSchema } from "@/types/project";

export default function AppPreview({ project }: { project?: ProjectSchema }) {
  if (!project) return <div className="card">Your app preview appears here.</div>;

  return (
    <div className="card">
      <h2>Live Preview: {project.title}</h2>
      {project.templateId === "clicker-game" && <ClickerGame props={project.templateProps} />}
      {project.templateId === "quiz-app" && <QuizApp props={project.templateProps} />}
      {project.templateId === "virtual-pet" && <VirtualPet props={project.templateProps} />}
      {project.templateId === "story-app" && <StoryApp props={project.templateProps} />}
      {project.templateId === "drawing-toy" && <DrawingToy />}
    </div>
  );
}
