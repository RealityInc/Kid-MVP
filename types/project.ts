export type AgeRange = "5-7" | "8-10" | "11-13";
export type AppType = "game" | "quiz" | "story" | "tracker" | "drawing";

export type SafetyCategory =
  | "adult"
  | "violence"
  | "sexual"
  | "self-harm"
  | "bullying"
  | "personal-data"
  | "external-contact"
  | "safe";

export interface ProjectSchema {
  title: string;
  ageRange: AgeRange;
  appType: AppType;
  description: string;
  objects: string[];
  rules: string[];
  screens: string[];
  learningConcepts: string[];
  safetyFlags: SafetyCategory[];
  templateId: "clicker-game" | "quiz-app" | "virtual-pet" | "story-app" | "drawing-toy";
  templateProps: Record<string, unknown>;
}

export interface GenerationResult {
  ok: boolean;
  blocked?: boolean;
  reason?: string;
  project?: ProjectSchema;
}
