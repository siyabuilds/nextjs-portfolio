"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-black text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <a href="/" className="text-2xl font-bold tracking-wide text-rose-400">
          siyabuilds.tech
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-mono text-sm">
          <a href="#about" className="hover:text-rose-300 transition">
            about
          </a>
          <a href="#projects" className="hover:text-rose-300 transition">
            projects
          </a>
          <a href="#contact" className="hover:text-rose-300 transition">
            contact
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-4 bg-black font-mono text-sm">
          <a
            href="#about"
            className="block hover:text-rose-300 transition"
            onClick={toggleMenu}
          >
            about
          </a>
          <a
            href="#projects"
            className="block hover:text-rose-300 transition"
            onClick={toggleMenu}
          >
            projects
          </a>
          <a
            href="#contact"
            className="block hover:text-rose-300 transition"
            onClick={toggleMenu}
          >
            contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
