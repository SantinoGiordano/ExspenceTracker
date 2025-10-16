"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white mx-auto mt-4 w-[90%] max-w-4xl px-6 py-3 flex items-center justify-between md:justify-center ">
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center p-4 ">
        <Link
          href="/"
          className="text-gray-800  hover:text-blue-600 transition-colors duration-300"
        >
          Home
        </Link>
       
        <Link
          href="/budget"
          className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Budget
        </Link>
        <Link
          href="/purchases"
          className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Purchases
        </Link>
        <Link
          href="/wallet"
          onClick={() => setMenuOpen(false)}
          className="text-black hover:text-blue-600 transition-colors duration-300"
        >
          Wallet
        </Link>
      </div>

      <div className="md:hidden ml-auto">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/99 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Top Menu */}
          <div className=" text-center fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className=" p-8 flex flex-col gap-6 w-[80%] max-w-xs mt-6 rounded-xl shadow-lg relative">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/budget"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                Budget
              </Link>
              <Link
                href="/purchases"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                Purchases
              </Link>
              <Link
                href="/wallet"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                Wallet
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
