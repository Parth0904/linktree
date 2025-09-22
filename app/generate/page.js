"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function GeneratePage() {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");

  const handleChange = (index, field, value) => {
    setLinks(prev =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addLink = () => setLinks(prev => [...prev, { link: "", linktext: "" }]);

  const submitLinks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle, pic, links }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message || "Bittree created successfully!");
        setLinks([{ link: "", linktext: "" }]);
        setPic("");
        setHandle("");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bittree already exists. Please try again!");
    }
  };

  const isDisabled = !handle || !pic || links.some(link => !link.linktext || !link.link);

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#1F57D2] p-4 md:p-10 gap-8">
      <section className="flex flex-col items-center justify-center w-full md:w-1/2">
        <ToastContainer />
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
            Create your Bittree
          </h1>

          {/* Step 1: Handle */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Step 1: Claim your Handle</label>
            <input
              value={handle}
              onChange={e => setHandle(e.target.value)}
              type="text"
              placeholder="Choose a Handle"
              className="w-full border rounded-full px-4 py-2 focus:outline-none bg-white"
            />
          </div>

          {/* Step 2: Links */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Step 2: Add Links</label>
            {links.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2">
                <input
                  value={item.linktext}
                  onChange={e => handleChange(index, "linktext", e.target.value)}
                  type="text"
                  placeholder="Enter link text"
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none bg-white"
                />
                <input
                  value={item.link}
                  onChange={e => handleChange(index, "link", e.target.value)}
                  type="url"
                  placeholder="Enter link"
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none bg-white"
                />
              </div>
            ))}
            <button
              onClick={addLink}
              className="bg-black text-white px-4 py-2 rounded-full mt-2 w-full sm:w-auto"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3: Picture */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold">Step 3: Add Picture</label>
            <input
              value={pic}
              onChange={e => setPic(e.target.value)}
              type="url"
              placeholder="Enter link to your Picture"
              className="w-full border rounded-full px-4 py-2 focus:outline-none bg-white"
            />
          </div>

          <button
            disabled={isDisabled}
            onClick={submitLinks}
            className={`w-full rounded-full px-6 py-3 font-semibold transition ${
              isDisabled ? "bg-slate-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            Create your Bittree
          </button>
        </div>
      </section>

      {/* Right side image */}
      <section className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://assets.production.linktr.ee/auth/3532/media/banner-login-desktop.f355be949b508c58ec2d.webp"
          alt="form side"
          className="max-w-sm md:max-w-md rounded-lg object-contain"
        />
      </section>
    </main>
  );
}
