import { Suspense } from "react";
import CreateClient from "@/app/create/CreateClient";

export default function CreatePage() {
  return (
    <Suspense fallback={<main className="container"><div className="card">Loading...</div></main>}>
      <CreateClient />
    </Suspense>
  );
}
