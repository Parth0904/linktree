"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-[90vw] mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        {/* Logo */}
        <Link href={"/"}>
          <img
            className="w-28 h-6"
            src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-10 font-semibold items-center">
          <li className="hover:text-pink-500 cursor-pointer">Products</li>
          <li className="hover:text-pink-500 cursor-pointer">Templates</li>
          <li className="hover:text-pink-500 cursor-pointer">Marketplace</li>
          <li className="hover:text-pink-500 cursor-pointer">Learn</li>
          <li className="hover:text-pink-500 cursor-pointer">Pricing</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="rounded-lg bg-gray-200 text-black px-6 py-2 hover:bg-gray-300 transition">
            Log in
          </button>
          <button className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition">
            Sign up free
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4 font-semibold">
            <li className="hover:text-pink-500 cursor-pointer">Products</li>
            <li className="hover:text-pink-500 cursor-pointer">Templates</li>
            <li className="hover:text-pink-500 cursor-pointer">Marketplace</li>
            <li className="hover:text-pink-500 cursor-pointer">Learn</li>
            <li className="hover:text-pink-500 cursor-pointer">Pricing</li>
            <li>
              <button className="md:hidden w-full rounded-lg bg-gray-200 text-black px-6 py-2 hover:bg-gray-300 transition">
                Log in
              </button>
            </li>
            <li>
              <button className="md:hidden w-full rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition">
                Sign up free
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
