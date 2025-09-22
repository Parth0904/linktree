"use client";

import dynamic from "next/dynamic";

const GeneratePageClient = dynamic(
  () => import("./GeneratePageClient"),
  { ssr: false } // disable server-side rendering
);

export default function Page() {
  return <GeneratePageClient />;
}
