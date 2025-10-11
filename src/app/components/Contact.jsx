"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import { TerminalLoader } from "../components/TerminalLoader";
import CodeBlock from "../components/CodeBlock";
import { FiMail } from "react-icons/fi";

export default function ContactPage() {
  const typedRef = useRef(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const contactCodeString = `
const contactInfo = {
  developer: "Siyabonga Lukhele (siyabuilds)",
  email: "siyabonga.lukhele@umuzi.org",
  location: "South Africa, Remote-friendly",
  status: "Available for opportunities",
  
  socials: {
    github: "github.com/siyabuilds",
    linkedin: "linkedin.com/in/siyabuilds", 
    twitter: "x.com/siyabuilds"
  },
  
  responseTime: "Within 24 hours",
  preferredContact: "Email or LinkedIn",
  
  availability: {
    freelance: "Open to discuss",
    fullTime: "Seeking opportunities",
    collaboration: "Always interested"
  },
  
  currentFocus: [
    "Full Stack Development",
    "Building portfolio projects",
    "Learning modern frameworks"
  ]
};`;

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Let&apos;s build something <span class='text-emerald-500'>amazing</span> together<span class='text-white'>.</span>",
      ],
      typeSpeed: 50,
      startDelay: 500,
      showCursor: true,
      cursorChar: "_",
      onComplete: () => setTypingComplete(true),
    });

    return () => typed.destroy();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowTerminal(true);

    try {
      const response = await fetch("https://formspree.io/f/xzzpggjp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    }

    setIsSubmitting(false);
  };

  const getTerminalMessages = () => {
    if (submissionStatus === "success") {
      return [
        "Initializing secure connection...",
        "Validating form data...",
        "Encrypting message content...",
        "Sending to server endpoint...",
        "✓ Message sent successfully!",
        "✓ You'll hear back soon!",
      ];
    } else if (submissionStatus === "error") {
      return [
        "Initializing secure connection...",
        "Validating form data...",
        "✗ Connection failed",
        "✗ Please try again later",
      ];
    }
    return ["Initializing secure connection...", "Processing your message..."];
  };

  const handleTerminalComplete = () => {
    setTimeout(() => {
      setShowTerminal(false);
      if (submissionStatus === "success") {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
      setSubmissionStatus(null);
    }, 2000);
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
              Have a project in mind, want to collaborate, or just want to say
              hello? I&apos;d love to hear from you. Let&apos;s connect and
              create something meaningful together.
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
                codeString={contactCodeString}
                language="javascript"
                title="contact.ts"
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
              codeString={contactCodeString}
              language="javascript"
              title="contact.ts"
            />
          </motion.div>
        </div>

        {/* Contact Form & Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: typingComplete ? 1 : 0,
            y: typingComplete ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid lg:grid-cols-3 gap-12"
          aria-hidden={!typingComplete}
        >
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Get In <span className="text-emerald-500">Touch</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <FiMail
                        className="w-4 h-4 text-emerald-500"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-mono text-emerald-500 text-sm">
                      Email
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    siyabonga.lukhele@umuzi.org
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-emerald-500 text-sm">
                      Location
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    South Africa, Remote-friendly
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-mono text-emerald-500 text-sm">
                      Response Time
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                Connect <span className="text-emerald-500">Online</span>
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/siyabuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-mono">GitHub</p>
                    <p className="text-white/60 text-xs">@siyabuilds</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/siyabuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-mono">LinkedIn</p>
                    <p className="text-white/60 text-xs">@siyabuilds</p>
                  </div>
                </a>

                <a
                  href="https://x.com/siyabuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-mono">
                      X (Twitter)
                    </p>
                    <p className="text-white/60 text-xs">@siyabuilds</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/27728765029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-mono">WhatsApp</p>
                    <p className="text-white/60 text-xs">+27 72 876 5029</p>
                  </div>
                </a>
              </div>

              {/* Download CV Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-6"
              >
                <a
                  href="/Siyabonga_Lukhele_Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-sm px-4 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download My CV
                </a>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-xl font-bold mb-6">
                Send a <span className="text-emerald-500">Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-sm py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
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
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center space-y-6"
          aria-hidden={!typingComplete}
        >
          <h2 className="text-2xl font-bold">
            Ready to <span className="text-emerald-500">Collaborate</span>?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Whether you have a project idea, need a development partner, or just
            want to connect with a fellow developer, I&apos;m always excited to
            meet new people and explore opportunities.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:siyabonga.lukhele@umuzi.org"
              className="bg-slate-400 px-6 py-3 text-black text-sm font-mono rounded-md shadow hover:bg-emerald-500 transition"
              tabIndex={typingComplete ? 0 : -1}
            >
              email me directly
            </a>
            <a
              href="https://linkedin.com/in/siyabuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:underline text-sm font-mono"
              tabIndex={typingComplete ? 0 : -1}
            >
              connect on linkedin
            </a>
          </div>
        </motion.div>
      </div>

      {/* Terminal Loader Popup */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <TerminalLoader
              messages={getTerminalMessages()}
              typingSpeed={30}
              onComplete={handleTerminalComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
