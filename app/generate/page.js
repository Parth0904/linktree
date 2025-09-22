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

  const addLink = () => {
    setLinks(prev => [...prev, { link: "", linktext: "" }]);
  };

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
    <main className="flex flex-col md:flex-row items-center justify-around h-screen bg-[#1F57D2] p-4">
      <section className="flex flex-col items-center justify-center w-full md:w-1/2">
        <ToastContainer />
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Create your Bittree
          </h1>

          {/* Step 1 */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-white">Step 1: Claim your Handle</h2>
            <input
              value={handle}
              onChange={e => setHandle(e.target.value)}
              type="text"
              placeholder="Choose a Handle"
              className="w-full border rounded-full px-4 py-2 focus:outline-none bg-white"
            />
          </div>

          {/* Step 2 */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-white">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
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
              className="bg-black text-white px-4 py-2 rounded-full mt-2"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3 */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-white">Step 3: Add Picture</h2>
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
            className={`w-full rounded-full px-6 py-3 font-semibold ${
              isDisabled ? "bg-slate-500" : "bg-black text-white"
            }`}
          >
            Create your Bittree
          </button>
        </div>
      </section>

      {/* Right side image */}
      <section className=" md:block w-1/2 flex justify-center">
        <img
          src="https://assets.production.linktr.ee/auth/3532/media/banner-login-desktop.f355be949b508c58ec2d.webp"
          alt="form side"
          className="max-w-sm rounded-lg"
        />
      </section>
    </main>
  );
}
