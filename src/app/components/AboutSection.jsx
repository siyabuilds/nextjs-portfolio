"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import CodeBlock from "./CodeBlock";

const AboutSection = () => {
  const typedRef = useRef(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const aboutCodeString = `
const aboutSiyabonga = {
  background: {
    education: "Matric 2021 — Self-taught dev",
    status: "Web Dev Student @ Umuzi",
    location: "South Africa, Remote-friendly"
  },

  journey: {
    start: "2021 - Matriculated at Phakamani High",
    now: "2025 - Advanced Web Dev @ Umuzi",
    stack: "From HTML/CSS/JS to Full Stack"
  },

  milestones: {
    fundamentals: "Strong in HTML, CSS, JS",
    tools: "Using Vite + React",
    backend: "Building RESTful APIs",
    learning: "Next.js & Full Stack dev"
  },

  goals: {
    current: "Master Full Stack dev",
    next: "Learn DevOps",
    future: "Specialise in Platform Engineering"
  }
};`;

  const skills = [
    {
      category: "Frontend",
      techs: ["Vite", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      techs: ["Node.js", "Express", "REST APIs", "MongoDB"],
    },
    {
      category: "Currently Learning",
      techs: [
        "Full Stack Dev",
        "API Design",
        "DevOps",
        "Serverless Architectures",
      ],
    },
    {
      category: "Tools & Build",
      techs: ["Git", "VS Code", "Vite/npm", "Chrome DevTools"],
    },
  ];

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Crafting digital experiences with <span class='text-emerald-500'>passion</span> and <span class='text-emerald-500'>precision</span><span class='text-white'>.</span>",
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
      {/* Main Content */}
      <div className="relative z-10 space-y-16">
        {/* Header Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-12">
          {/* Left Side */}
          <div className="space-y-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              <div
                className="min-h-[88px] md:min-h-[112px] inline-block"
                aria-hidden="true"
              >
                <span ref={typedRef} />
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: typingComplete ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 max-w-lg text-lg"
              aria-hidden={!typingComplete}
            >
              I'm Siyabonga Lukhele, an aspiring Full Stack Developer currently
              advancing my skills at Umuzi Experience Labs. I'm passionate about
              building clean, functional web experiences and solving problems
              through code.
            </motion.p>

            {/* Mobile CodeBlock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: typingComplete ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block lg:hidden"
              aria-hidden={!typingComplete}
            >
              <CodeBlock
                codeString={aboutCodeString}
                language="javascript"
                title="about.ts"
              />
            </motion.div>
          </div>

          {/* Right Side: Code Block for desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: typingComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block w-full"
            aria-hidden={!typingComplete}
          >
            <CodeBlock
              codeString={aboutCodeString}
              language="javascript"
              title="about.ts"
            />
          </motion.div>
        </div>

        {/* Skills & Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-8"
          aria-hidden={!typingComplete}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Technical <span className="text-emerald-500">Expertise</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: typingComplete ? 1 : 0,
                  y: typingComplete ? 0 : 20,
                }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-emerald-500 font-mono text-sm font-semibold mb-4">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.techs.map((tech) => (
                    <div
                      key={tech}
                      className="text-white/80 text-sm font-mono bg-white/5 px-3 py-1 rounded"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey & Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid lg:grid-cols-2 gap-12"
          aria-hidden={!typingComplete}
        >
          {/* My Journey */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              My <span className="text-emerald-500">Journey</span>
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-6 space-y-4">
                <div>
                  <h3 className="font-mono text-emerald-500 text-sm">2021</h3>
                  <p className="text-white/80">
                    Completed Matric at Phakamani Secondary School, setting the
                    foundation for my educational journey.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-emerald-500 text-sm">
                    June 2024 - Dec 2024
                  </h3>
                  <p className="text-white/80">
                    Participated in Umuzi Upskilling program, learning
                    problem-solving through data structures and algorithms.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-emerald-500 text-sm">
                    April 2025 - Oct 2025
                  </h3>
                  <p className="text-white/80">
                    Currently learning Advanced Web Development at Umuzi
                    Experience Labs, building from HTML/CSS/JS to Full Stack
                    systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values & Approach */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              My <span className="text-emerald-500">Approach</span>
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-mono text-emerald-500 text-sm mb-2">
                  Learning Mindset
                </h3>
                <p className="text-white/80 text-sm">
                  I approach every challenge as a learning opportunity, breaking
                  down complex problems into manageable pieces and building
                  solutions step by step.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-mono text-emerald-500 text-sm mb-2">
                  Hands-On Practice
                </h3>
                <p className="text-white/80 text-sm">
                  I believe in learning by doing. From HTML fundamentals to
                  React applications, I build projects to solidify my
                  understanding of new concepts.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-mono text-emerald-500 text-sm mb-2">
                  Future Goals
                </h3>
                <p className="text-white/80 text-sm">
                  Currently mastering Full Stack development with plans to get
                  certified in DevOps and eventually specialize in Platform
                  Engineering.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center space-y-6"
          aria-hidden={!typingComplete}
        >
          <h2 className="text-2xl font-bold">
            Let's <span className="text-emerald-500">Connect</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            I'm currently focused on mastering Full Stack development and would
            love to connect with fellow developers, mentors, or anyone
            interested in collaborating on learning projects. Let's grow
            together!
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/contact"
              className="bg-slate-400 px-6 py-3 text-black text-sm font-mono rounded-md shadow hover:bg-emerald-500 transition"
              tabIndex={typingComplete ? 0 : -1}
            >
              get in touch
            </a>
            <a
              href="/projects"
              className="text-white/70 hover:underline text-sm font-mono"
              tabIndex={typingComplete ? 0 : -1}
            >
              view my work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
