"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import CodeBlock from "./CodeBlock";

const ProjectsSection = () => {
  const typedRef = useRef(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const projectsCodeString = `
const myProjects = {
  status: "Building & Learning",
  philosophy: "Learn by doing, build by solving",
  
  upcoming: {
    taskManager: {
      tech: ["TypeScript", "PostgreSQL", "Docker"],
      status: "In Development",
      focus: "Full Stack Architecture"
    },
    
    bankingAPI: {
      tech: ["Node.js", "Express", "REST"],
      status: "Planning Phase", 
      focus: "API Design & Security"
    },
    
    portfolio: {
      tech: ["Next.js", "Framer Motion", "Tailwind"],
      status: "You're looking at it!",
      focus: "Modern UI/UX"
    }
  }
};`;

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Carbon Footprint Tracker",
      description:
        "This is currently a frontend project that will evolve into a full-stack application. It tracks your carbon footprint using JavaScript, and will use MongoDB in the coming future.",
      tech: ["Vite", "JavaScript", "Chart.js", "Node.js", "MongoDB"],
      status: "In Development",
      category: "Full Stack",
      demoUrl: "https://carbon-footprint.siyabuilds.tech",
      codeUrl: "https://github.com/siyabuilds/carbon-footprint-tracker",
      image: "/carbon-footprint.png",
    },
    {
      id: 2,
      title: "Interactive Portfolio",
      description:
        "Modern, animated portfolio website showcasing my development journey. Built with Next.js, Framer Motion, and Tailwind CSS for smooth user experience.",
      tech: ["Next.js", "Framer Motion", "Tailwind CSS", "JavaScript"],
      status: "Live",
      category: "Frontend",
      demoUrl: "https://siyabuilds.tech",
      codeUrl: "https://github.com/siyabuilds/nextjs-portfolio",
      image: "/nextjs-portfolio.png",
    },
    {
      id: 3,
      title: "Word Unscrambler",
      description:
        "Built with Next.js and TypeScript, this app lets you unscramble words using a custom API powered by a word list. Smooth UX and fun features.",
      tech: ["Next.js", "TypeScript", "APIs"],
      status: "Live",
      category: "Backend",
      demoUrl: "#",
      codeUrl: "https://github.com/siyabuilds/word-unscrambler",
      image: "/word-unscrambler.png",
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Building tomorrow's solutions with <span class='text-rose-400'>code</span> and <span class='text-rose-400'>creativity</span><span class='text-white'>.</span>",
      ],
      typeSpeed: 50,
      startDelay: 500,
      showCursor: true,
      cursorChar: "_",
      onComplete: () => setTypingComplete(true),
    });

    return () => typed.destroy();
  }, []);

  const sortProjectsByStatus = (projectsToSort) => {
    const statusPriority = {
      Live: 1,
      "In Development": 2,
      Planning: 3,
    };

    return projectsToSort.sort((a, b) => {
      const priorityA = statusPriority[a.status] || 4;
      const priorityB = statusPriority[b.status] || 4;
      return priorityA - priorityB;
    });
  };

  useEffect(() => {
    let filtered;
    if (activeCategory === "All") {
      filtered = [...projects];
    } else {
      filtered = projects.filter(
        (project) => project.category === activeCategory
      );
    }

    // Sort the filtered projects by status priority
    const sorted = sortProjectsByStatus(filtered);
    setFilteredProjects(sorted);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "text-green-400 bg-green-400/10";
      case "In Development":
        return "text-yellow-400 bg-yellow-400/10";
      case "Planning":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

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
              Here's a showcase of my development journey - from learning
              projects to full-stack applications. Each project represents a
              step forward in my quest to master modern web development.
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
                codeString={projectsCodeString}
                language="javascript"
                title="projects.ts"
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
              codeString={projectsCodeString}
              language="javascript"
              title="projects.ts"
            />
          </motion.div>
        </div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
          aria-hidden={!typingComplete}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-rose-400 text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={typingComplete ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 hover:border-rose-400/50 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="h-48 relative overflow-hidden">
                {project.image && !project.image.includes("placeholder") ? (
                  <>
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/20 to-rose-400/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </>
                ) : (
                  <>
                    <div className="h-full bg-gradient-to-br from-rose-400/20 via-purple-400/20 to-blue-400/20 relative">
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-white/60 text-center">
                          <div className="text-4xl mb-2">🚀</div>
                          <div className="font-mono text-xs">
                            Preview Coming Soon
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/20 to-rose-400/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-rose-400 font-mono text-xs">
                    {project.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-rose-400 font-mono text-xs">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/5 text-white/80 px-2 py-1 rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.demoUrl}
                    target={project.demoUrl !== "#" ? "_blank" : "_self"}
                    rel={project.demoUrl !== "#" ? "noopener noreferrer" : ""}
                    className={`flex-1 text-center py-2 px-4 rounded font-mono text-xs transition-all duration-300 ${
                      project.demoUrl === "#"
                        ? "bg-rose-400/5 text-rose-400/50 cursor-not-allowed"
                        : "bg-rose-400/10 text-rose-400 hover:bg-rose-400 hover:text-black"
                    }`}
                    onClick={
                      project.demoUrl === "#"
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                  >
                    {project.demoUrl === "#" ? "Demo Coming Soon" : "View Demo"}
                  </a>
                  <a
                    href={project.codeUrl}
                    target={project.codeUrl !== "#" ? "_blank" : "_self"}
                    rel={project.codeUrl !== "#" ? "noopener noreferrer" : ""}
                    className={`flex-1 text-center py-2 px-4 rounded font-mono text-xs transition-all duration-300 ${
                      project.codeUrl === "#"
                        ? "bg-white/5 text-white/30 cursor-not-allowed"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={
                      project.codeUrl === "#"
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                  >
                    {project.codeUrl === "#" ? "Code Private" : "View Code"}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center space-y-6 bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10"
          aria-hidden={!typingComplete}
        >
          <div className="space-y-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-6xl"
            >
              🔨
            </motion.div>
            <h2 className="text-2xl font-bold">
              More Projects <span className="text-rose-400">Coming Soon</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              I'm constantly learning and building new projects. Follow my
              journey as I explore new technologies, tackle interesting
              challenges, and contribute to the developer community.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href="/contact"
              className="bg-rose-300 px-6 py-3 text-black text-sm font-mono rounded-md shadow hover:bg-rose-400 transition"
              tabIndex={typingComplete ? 0 : -1}
            >
              collaborate with me
            </a>
            <a
              href="https://github.com/siyabuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:underline text-sm font-mono"
              tabIndex={typingComplete ? 0 : -1}
            >
              follow on github
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
