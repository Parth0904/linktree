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
    <main className="py-20 min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <section className="flex flex-col justify-center items-start px-6 md:px-[5vw] py-20 md:py-0 gap-6">
        <div className="flex flex-col text-yellow-300 space-y-2">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            Everything you
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            are. In one,
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            simple link in bio.
          </p>
        </div>

        <div className="text-white text-base sm:text-lg md:text-xl font-semibold">
          Join 70M+ people using Linktree for their link in bio. One link to
          help you share everything you create, curate and sell from your
          Instagram, TikTok, Twitter, YouTube and other social media profiles.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full max-w-md">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-white rounded-lg px-4 py-3 font-bold focus:outline-none"
            type="text"
            placeholder="Enter your handle"
          />
          <button
            onClick={createTree}
            className="w-full sm:w-auto rounded-full bg-pink-200 font-bold px-6 py-3 hover:bg-pink-300 transition"
          >
            Claim your Bittree
          </button>
        </div>
      </section>

      {/* Right Section */}
      <section className="flex justify-center items-center py-20 md:py-0">
        <Image
          src="/section.png"
          alt="Section Image"
          width={600}
          height={600}
          className="w-[80%] md:w-[90%] lg:w-[80%] h-auto object-contain"
        />
      </section>
    </main>
  );
}
