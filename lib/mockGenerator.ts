import { GenerationResult, ProjectSchema } from "@/types/project";
import { moderatePrompt, stripExternalLinks } from "@/lib/safety";

interface PromptTemplate {
  id: ProjectSchema["templateId"];
  title: string;
  appType: ProjectSchema["appType"];
  description: string;
  objects: string[];
  rules: string[];
  screens: string[];
  learningConcepts: string[];
  templateProps: Record<string, unknown>;
}

const MOCK_TEMPLATES: Record<string, PromptTemplate> = {
  quiz: {
    id: "quiz-app",
    title: "Dino Quiz Time",
    appType: "quiz",
    description: "Answer questions and earn stars.",
    objects: ["questions", "answers", "score"],
    rules: ["Pick one answer", "Get points for correct answers"],
    screens: ["welcome", "quiz", "result"],
    learningConcepts: ["conditions", "score variables", "state"],
    templateProps: {
      questions: [
        { q: "Which dinosaur had three horns?", options: ["Triceratops", "Raptor", "T-Rex"], answer: 0 },
        { q: "Which one could fly?", options: ["Stegosaurus", "Pteranodon", "Ankylosaurus"], answer: 1 },
      ],
    },
  },
  pet: {
    id: "virtual-pet",
    title: "Happy Pet Care",
    appType: "tracker",
    description: "Take care of your pet by feeding and playing.",
    objects: ["pet", "hunger", "energy", "happiness"],
    rules: ["Feed to reduce hunger", "Play to increase happiness"],
    screens: ["pet room"],
    learningConcepts: ["variables", "buttons", "timers"],
    templateProps: { petName: "Bubbles", petEmoji: "🐶" },
  },
  story: {
    id: "story-app",
    title: "Choose Your Path",
    appType: "story",
    description: "Pick choices and see what happens next.",
    objects: ["pages", "choices"],
    rules: ["Choose one option to continue"],
    screens: ["story page"],
    learningConcepts: ["branching logic", "state"],
    templateProps: {
      nodes: [
        {
          id: "start",
          text: "You find a map in the forest.",
          choices: [
            { text: "Follow the river", nextId: "river" },
            { text: "Climb the hill", nextId: "hill" },
          ],
        },
        { id: "river", text: "You found a treasure chest!", choices: [{ text: "Play again", nextId: "start" }] },
        { id: "hill", text: "You meet a friendly dragon.", choices: [{ text: "Play again", nextId: "start" }] },
      ],
    },
  },
  drawing: {
    id: "drawing-toy",
    title: "Color Splash Studio",
    appType: "drawing",
    description: "Draw with colors and clear your canvas.",
    objects: ["canvas", "brush"],
    rules: ["Drag finger/mouse to draw"],
    screens: ["canvas"],
    learningConcepts: ["input events", "coordinates"],
    templateProps: {},
  },
  clicker: {
    id: "clicker-game",
    title: "Tap Star Game",
    appType: "game",
    description: "Tap fast to score points before time runs out.",
    objects: ["player", "target", "score", "timer"],
    rules: ["Tap target to get points", "Timer ends game"],
    screens: ["start", "game", "result"],
    learningConcepts: ["loops", "timers", "score variables"],
    templateProps: { character: "⭐", target: "🫧", goal: 15, seconds: 20 },
  },
};

function toProject(template: PromptTemplate, overrides?: Partial<ProjectSchema>): ProjectSchema {
  return {
    title: template.title,
    ageRange: "8-10",
    appType: template.appType,
    description: template.description,
    objects: template.objects,
    rules: template.rules,
    screens: template.screens,
    learningConcepts: template.learningConcepts,
    safetyFlags: ["safe"],
    templateId: template.id,
    templateProps: template.templateProps,
    ...overrides,
  };
}

export async function generateProjectFromPrompt(rawPrompt: string): Promise<GenerationResult> {
  const cleanedPrompt = stripExternalLinks(rawPrompt).slice(0, 400);
  if (!cleanedPrompt) return { ok: false, blocked: true, reason: "Please type an idea first." };

  const safety = moderatePrompt(cleanedPrompt);
  if (!safety.isSafe) return { ok: false, blocked: true, reason: safety.reason };

  const prompt = cleanedPrompt.toLowerCase();
  if (prompt.includes("quiz") || prompt.includes("trivia")) return { ok: true, project: toProject(MOCK_TEMPLATES.quiz) };
  if (prompt.includes("pet") || prompt.includes("care")) return { ok: true, project: toProject(MOCK_TEMPLATES.pet) };
  if (prompt.includes("story") || prompt.includes("adventure")) return { ok: true, project: toProject(MOCK_TEMPLATES.story) };
  if (prompt.includes("draw") || prompt.includes("paint") || prompt.includes("art")) return { ok: true, project: toProject(MOCK_TEMPLATES.drawing) };

  const sharkOverrides = prompt.includes("shark")
    ? {
        title: "Shark Chomp Game",
        templateProps: { character: "🦈", target: prompt.includes("submarine") ? "🚢" : "🫧", goal: 15, seconds: 20 },
      }
    : undefined;

  return { ok: true, project: toProject(MOCK_TEMPLATES.clicker, sharkOverrides) };
}
