"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-black text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-blue-400"
        >
          siyabuilds.tech
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-mono text-sm">
          <Link href="/about" className="hover:text-blue-300 transition">
            about
          </Link>
          <Link href="/projects" className="hover:text-blue-300 transition">
            projects
          </Link>
          <Link href="/chat" className="hover:text-blue-300 transition">
            chat
          </Link>
          <Link href="/contact" className="hover:text-blue-300 transition">
            contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none relative">
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.1 },
              },
            }}
            className="md:hidden overflow-hidden bg-black border-t border-white/10"
          >
            <motion.div
              className="px-6 pb-4 pt-2 space-y-4 font-mono text-sm"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: -10, opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/about"
                  className="block hover:text-blue-300 transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  about
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: -10, opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/projects"
                  className="block hover:text-blue-300 transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  projects
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: -10, opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/chat"
                  className="block hover:text-blue-300 transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  chat
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: -10, opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="block hover:text-blue-300 transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  contact
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
