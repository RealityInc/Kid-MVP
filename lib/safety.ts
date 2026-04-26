const BLOCKED_KEYWORDS: Record<string, string[]> = {
  adult: ["sex", "nude", "porn", "nsfw"],
  violence: ["kill", "murder", "blood", "gun", "weapon", "bomb"],
  sexual: ["sexy", "kiss me", "hot body"],
  "self-harm": ["hurt myself", "suicide", "self harm"],
  bullying: ["bully", "insult", "harass", "mean to"],
  "personal-data": ["phone number", "address", "email", "password"],
  "external-contact": ["chat with strangers", "message users", "dm", "social media link"],
};

export interface SafetyResult {
  isSafe: boolean;
  categories: string[];
  reason?: string;
}

export function moderatePrompt(input: string): SafetyResult {
  const prompt = input.toLowerCase();
  const categories = Object.entries(BLOCKED_KEYWORDS)
    .filter(([, words]) => words.some((word) => prompt.includes(word)))
    .map(([category]) => category);

  if (categories.length > 0) {
    return {
      isSafe: false,
      categories,
      reason: "This idea is blocked for kid safety. Try a fun, kind, school-safe idea.",
    };
  }

  return { isSafe: true, categories: ["safe"] };
}

export function stripExternalLinks(text: string): string {
  return text.replace(/https?:\/\/\S+/gi, "").replace(/www\.\S+/gi, "").trim();
}
