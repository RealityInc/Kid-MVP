"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PromptBox from "@/components/PromptBox";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  return (
    <main className="container">
      <PromptBox
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={() => router.push(`/create?prompt=${encodeURIComponent(prompt)}`)}
      />
    </main>
  );
}
