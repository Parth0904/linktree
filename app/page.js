"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    if (!text.trim()) return; // prevent empty input
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <section className="flex flex-col gap-4 pl-10 md:pl-[5vw] my-[25vh]">
        <div className="flex flex-col items-start text-yellow-300">
          <p className="text-7xl font-extrabold">Everything you</p>
          <p className="text-7xl font-extrabold">are. In one,</p>
          <p className="text-7xl font-extrabold">simple link in bio.</p>
        </div>
        <div className="text-xl text-white font-semibold">
          <p>
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
        </div>
        <div className="flex justify-start gap-3 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-white rounded-lg px-6 py-4 font-bold"
            type="text"
            placeholder="Enter your handle"
          />
          <button
            onClick={createTree}
            className="rounded-full bg-pink-200 font-bold px-6 py-4"
          >
            Claim your Bittree
          </button>
        </div>
      </section>
      <section className="flex justify-center my-[25vh]">
        <Image
          src="/section.png"
          alt="Section Image"
          width={600}
          height={600}
          className="h-[60vh]"
        />
      </section>
    </main>
  );
}
