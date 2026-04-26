import { generateProjectFromPrompt } from "@/lib/generateProject";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await generateProjectFromPrompt(prompt || "");
  return Response.json(result);
}
