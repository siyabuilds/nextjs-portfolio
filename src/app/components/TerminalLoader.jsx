"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function TerminalLoader({
  mode = "alert", // "alert" or "typing"
  messages = [],
  typingSpeed = 50,
  onComplete,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Typing mode states
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [completedMessages, setCompletedMessages] = useState([]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const handleGoToNewPortfolio = () => {
    window.location.href = "https://samson.codes";
  };

  // Typing effect for form submission mode
  useEffect(() => {
    if (mode !== "typing" || !messages.length) return;

    if (currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex];

      if (currentCharIndex < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentMessage[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);

        return () => clearTimeout(timeout);
      } else {
        // Complete current message
        const timeout = setTimeout(() => {
          setCompletedMessages((prev) => [...prev, displayedText]);
          setCurrentMessageIndex((prev) => prev + 1);
          setDisplayedText("");
          setCurrentCharIndex(0);

          // If all messages are complete, call onComplete
          if (currentMessageIndex === messages.length - 1) {
            onComplete && onComplete();
          }
        }, 800);

        return () => clearTimeout(timeout);
      }
    }
  }, [
    mode,
    currentMessageIndex,
    currentCharIndex,
    messages,
    typingSpeed,
    onComplete,
    displayedText,
  ]);

  // Blinking cursor for typing mode
  useEffect(() => {
    if (mode !== "typing") return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [mode]);

  if (!isVisible) return null;

  // Alert Mode (for landing page)
  if (mode === "alert") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-green-400 p-6 rounded-2xl font-mono text-sm md:text-base w-full max-w-lg shadow-2xl border border-gray-700/50 backdrop-blur-sm"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/30">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2 font-semibold tracking-wider">
                ALERT
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-gray-700/50"
            aria-label="Close alert"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div className="space-y-4">
          {/* Alert Message */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 font-bold text-xl">⚠</span>
              <div className="flex-1">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">
                  New Portfolio Available!
                </h3>
                <p className="text-green-300 leading-relaxed">
                  I've launched a brand new portfolio at{" "}
                  <span className="text-cyan-400 font-semibold">
                    samson.codes
                  </span>
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Check out the latest version with updated projects and
                  features.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <button
              onClick={handleGoToNewPortfolio}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Yes, Go To!</span>
                <span className="text-lg">→</span>
              </span>
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-gray-700/30 hover:shadow-gray-600/50"
            >
              Stay Here
            </button>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-4 pt-3 border-t border-gray-700/30">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-60"></div>
        </div>
      </motion.div>
    );
  }

  // Typing Mode (for form submission feedback)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-green-400 p-6 rounded-2xl font-mono text-sm md:text-base w-full max-w-lg shadow-2xl border border-gray-700/50 backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></div>
            </div>
            <span className="text-xs text-gray-400 ml-2 font-semibold tracking-wider">
              TERMINAL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/30"></div>
          <span className="text-xs text-gray-500">ACTIVE</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2 min-h-[120px]">
        {/* Display completed messages */}
        {completedMessages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <span className="text-emerald-500 font-bold">❯</span>
            <span className="text-green-300 leading-relaxed">{message}</span>
          </motion.div>
        ))}

        {/* Current typing message */}
        {currentMessageIndex < messages.length && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <span className="text-emerald-500 font-bold">❯</span>
            <div className="flex items-center">
              <span className="text-green-300 leading-relaxed">
                {displayedText}
              </span>
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="ml-0.5 w-2 h-5 bg-emerald-500 inline-block shadow-lg shadow-emerald-500/50"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Loading indicator when complete */}
        {currentMessageIndex >= messages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 mt-4"
          >
            <div className="flex gap-1">
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0,
                }}
                className="w-1 h-1 bg-emerald-500 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.2,
                }}
                className="w-1 h-1 bg-emerald-500 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.4,
                }}
                className="w-1 h-1 bg-emerald-500 rounded-full"
              />
            </div>
            <span className="text-xs">Process complete</span>
          </motion.div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="mt-4 pt-3 border-t border-gray-700/30">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60"></div>
      </div>
    </motion.div>
  );
}
