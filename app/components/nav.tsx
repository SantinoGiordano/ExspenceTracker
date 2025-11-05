"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUserStore } from "../store/store";


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { username } = useUserStore(); // get username from Zustand

  return (
    <nav className="bg-white mx-auto mt-4 w-[90%] max-w-4xl px-6 py-3 flex items-center justify-between shadow-sm rounded-xl">
      {/* Left: Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center p-4">
        <Link
          href="/home"
          className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
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
          className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Wallet
        </Link>
      </div>

      {/* Right: Username (Desktop only) */}
      {username && (
        <div className="hidden md:block text-gray-700 font-medium ml-auto pr-4">
          Welcome, <span className="text-blue-600 font-semibold">{username}</span>
        </div>
      )}

      {/* Hamburger Icon (Mobile only) */}
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
            className="fixed inset-0 bg-black/90 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu Drawer */}
          <div className="text-center fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className="bg-gray-900 text-white p-8 flex flex-col gap-6 w-[80%] max-w-xs mt-6 rounded-xl shadow-lg relative">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              <Link
                href="/home"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/budget"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Budget
              </Link>
              <Link
                href="/purchases"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Purchases
              </Link>
              <Link
                href="/wallet"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Wallet
              </Link>

              {username && (
                <div className="pt-4 text-sm text-gray-300 border-t border-gray-700">
                  Logged in as{" "}
                  <span className="text-blue-400 font-semibold">{username}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
