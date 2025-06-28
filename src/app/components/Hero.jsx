"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import CodeBlock from "./CodeBlock";

const HeroSection = () => {
  const typedRef = useRef(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const portfolioCodeString = `
const samson = {
  name: "Samson Lukhele",
  aliases: ["Spha", "siyabuilds"],
  role: "Full Stack Web Developer",
  mission: "Crafting accessible and intelligent digital experiences.",
  affiliation: "Umuzi Experience Labs",
  techStack: {
    frontend: ["React", "Next.js", "ShadCN", "Framer Motion"],
    backend: ["Node.js", "PostgreSQL", "Docker"],
    devOps: ["GitHub Actions", "DigitalOcean", "Azure"],
  },
  featuredProjects: [
    "Task Manager (TypeScript + PostgreSQL + Docker)",
    "Mock Banking API",
  ],
  focusAreas: ["TypeScript", "Design Thinking", "Modern UI/UX"],
  roadmap: [
    "Launch Task Manager",
    "Dockerize and Deploy",
    "Contribute to Open Source",
  ],
};`;

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Building clean, modern web experiences <br />on the edge of <span class='text-rose-400'>tech</span><span class='text-white'>.</span>",
      ],
      typeSpeed: 50,
      startDelay: 500,
      showCursor: true,
      cursorChar: "_",
      onComplete: () => setTypingComplete(true),
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="relative text-white min-h-screen px-6 md:px-16 py-12 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute right-0 top-0 w-full h-full hidden lg:block pointer-events-none z-0">
        <div className="grid grid-cols-6 gap-4 opacity-5 w-full h-full">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="bg-white/10 aspect-square"></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 items-center gap-12">
        {/* Left Side */}
        <div className="space-y-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {/* 🛠️ This wrapper div holds space + aligns text */}
            <div
              className="min-h-[88px] md:min-h-[112px] inline-block"
              aria-hidden="true"
            >
              <span ref={typedRef} />
            </div>
          </motion.h1>

          {/* Always render these elements to maintain consistent layout, but with conditional opacity */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-lg"
            aria-hidden={!typingComplete}
          >
            I'm Sam — a frontend dev building smooth, responsive UIs with React,
            Next.js, and some DevOps sauce on the side. Powered by Linux and a
            love for clean code.
          </motion.p>

          {/* CodeBlock for mobile - always rendered for layout consistency */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="block lg:hidden"
            aria-hidden={!typingComplete}
          >
            <CodeBlock
              codeString={portfolioCodeString}
              language="javascript"
              title="samson.ts"
            />
          </motion.div>

          {/* Buttons - always rendered for layout consistency */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4"
            aria-hidden={!typingComplete}
          >
            <a
              href="#projects"
              className="bg-rose-300 px-5 py-2 text-black text-sm font-mono rounded-md shadow hover:bg-rose-400 transition"
              tabIndex={typingComplete ? 0 : -1}
            >
              view projects
            </a>
            <a
              href="#contact"
              className="text-white/70 hover:underline text-sm font-mono"
              tabIndex={typingComplete ? 0 : -1}
            >
              get in touch
            </a>
          </motion.div>
        </div>

        {/* Right Side: Code Block for desktop - always rendered for layout consistency */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: typingComplete ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block w-full"
          aria-hidden={!typingComplete}
        >
          <CodeBlock
            codeString={portfolioCodeString}
            language="javascript"
            title="samson.ts"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
