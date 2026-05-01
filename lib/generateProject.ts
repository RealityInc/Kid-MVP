import { moderatePrompt, stripExternalLinks } from "@/lib/safety";
import { GenerationResult, ProjectSchema } from "@/types/project";

function buildBaseProject(overrides: Partial<ProjectSchema>): ProjectSchema {
  return {
    title: "My Kid App",
    ageRange: "8-10",
    appType: "game",
    description: "A fun project you can play and edit.",
    objects: [],
    rules: [],
    screens: ["home"],
    learningConcepts: ["buttons", "variables"],
    safetyFlags: ["safe"],
    templateId: "clicker-game",
    templateProps: {},
    ...overrides,
  };
}

export async function generateProjectFromPrompt(rawPrompt: string): Promise<GenerationResult> {
  const cleanedPrompt = stripExternalLinks(rawPrompt).slice(0, 400);
  const safety = moderatePrompt(cleanedPrompt);

  if (!cleanedPrompt) {
    return { ok: false, blocked: true, reason: "Please type an idea first." };
  }

  if (!safety.isSafe) {
    return { ok: false, blocked: true, reason: safety.reason };
  }

  const prompt = cleanedPrompt.toLowerCase();

  if (prompt.includes("quiz") || prompt.includes("trivia")) {
    return {
      ok: true,
      project: buildBaseProject({
        title: "Dino Quiz Time",
        appType: "quiz",
        description: "Answer questions and earn stars.",
        objects: ["questions", "answers", "score"],
        rules: ["Pick one answer", "Get points for correct answers"],
        screens: ["welcome", "quiz", "result"],
        learningConcepts: ["conditions", "score variables", "state"],
        templateId: "quiz-app",
        templateProps: {
          questions: [
            { q: "Which dinosaur had three horns?", options: ["Triceratops", "Raptor", "T-Rex"], answer: 0 },
            { q: "Which one could fly?", options: ["Stegosaurus", "Pteranodon", "Ankylosaurus"], answer: 1 },
          ],
        },
      }),
    };
  }

  if (prompt.includes("pet") || prompt.includes("care")) {
    return {
      ok: true,
      project: buildBaseProject({
        title: "Happy Pet Care",
        appType: "tracker",
        description: "Take care of your pet by feeding and playing.",
        objects: ["pet", "hunger", "energy", "happiness"],
        rules: ["Feed to reduce hunger", "Play to increase happiness"],
        screens: ["pet room"],
        learningConcepts: ["variables", "buttons", "timers"],
        templateId: "virtual-pet",
        templateProps: { petName: "Bubbles", petEmoji: "🐶" },
      }),
    };
  }

  if (prompt.includes("story") || prompt.includes("adventure")) {
    return {
      ok: true,
      project: buildBaseProject({
        title: "Choose Your Path",
        appType: "story",
        description: "Pick choices and see what happens next.",
        objects: ["pages", "choices"],
        rules: ["Choose one option to continue"],
        screens: ["story page"],
        learningConcepts: ["branching logic", "state"],
        templateId: "story-app",
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
      }),
    };
  }

  if (prompt.includes("draw") || prompt.includes("paint") || prompt.includes("art")) {
    return {
      ok: true,
      project: buildBaseProject({
        title: "Color Splash Studio",
        appType: "drawing",
        description: "Draw with colors and clear your canvas.",
        objects: ["canvas", "brush"],
        rules: ["Drag finger/mouse to draw"],
        screens: ["canvas"],
        learningConcepts: ["input events", "coordinates"],
        templateId: "drawing-toy",
        templateProps: {},
      }),
    };
  }

  return {
    ok: true,
    project: buildBaseProject({
      title: prompt.includes("shark") ? "Shark Chomp Game" : "Tap Star Game",
      appType: "game",
      description: "Tap fast to score points before time runs out.",
      objects: ["player", "target", "score", "timer"],
      rules: ["Tap target to get points", "Timer ends game"],
      screens: ["start", "game", "result"],
      learningConcepts: ["loops", "timers", "score variables"],
      templateId: "clicker-game",
      templateProps: {
        character: prompt.includes("shark") ? "🦈" : "⭐",
        target: prompt.includes("submarine") ? "🚢" : "🫧",
        goal: 15,
        seconds: 20,
      },
    }),
  };
}
