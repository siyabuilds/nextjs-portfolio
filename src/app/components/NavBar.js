"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-dark-gray text-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-light-blue">
          <Link href="/">Samson Lukhele</Link>
        </div>
        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              href="/about"
              className="px-4 py-4 rounded-lg bg-transparent hover:bg-light-blue hover:text-dark-gray transition-all duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="px-4 py-4 rounded-lg bg-transparent hover:bg-light-blue hover:text-dark-gray transition-all duration-200"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="px-4 py-4 rounded-lg bg-transparent hover:bg-light-blue hover:text-dark-gray transition-all duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <li>
            <Link
              href="#about"
              className="hover:text-light-blue transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="hover:text-light-blue transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-light-blue transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
