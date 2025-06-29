"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TerminalLoader({ messages, typingSpeed = 50, onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [completedMessages, setCompletedMessages] = useState([]);
  const [showingInitialMessages, setShowingInitialMessages] = useState(true);

  // Typing effect
  useEffect(() => {
    // Show first 2 messages initially
    if (showingInitialMessages && currentMessageIndex < 2 && messages.length >= 2) {
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
          
          // If we've shown first 2 messages, stop and wait
          if (currentMessageIndex === 1) {
            setShowingInitialMessages(false);
          }
        }, 800);

        return () => clearTimeout(timeout);
      }
    }
    
    // Continue with remaining messages after initial completion
    if (!showingInitialMessages && currentMessageIndex < messages.length) {
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
    currentMessageIndex,
    currentCharIndex,
    messages,
    typingSpeed,
    onComplete,
    showingInitialMessages,
    displayedText,
  ]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Add method to continue with remaining messages
  const continueWithRemainingMessages = () => {
    if (!showingInitialMessages) return;
    setShowingInitialMessages(false);
    if (currentMessageIndex < messages.length) {
      // Reset for next message if we have more
      setCurrentMessageIndex(Math.max(2, currentMessageIndex));
      setDisplayedText("");
      setCurrentCharIndex(0);
    }
  };

  // Auto-continue after showing first 2 messages (after a delay)
  useEffect(() => {
    if (!showingInitialMessages && currentMessageIndex === 2 && messages.length > 2) {
      const timeout = setTimeout(() => {
        continueWithRemainingMessages();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [showingInitialMessages, currentMessageIndex, messages.length]);

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
            <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/30"></div>
            <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2 font-semibold tracking-wider">TERMINAL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-lg shadow-rose-500/30"></div>
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
            <span className="text-rose-500 font-bold">❯</span>
            <span className="text-green-300 leading-relaxed">{message}</span>
          </motion.div>
        ))}
        
        {/* Current typing message */}
        {(showingInitialMessages || (!showingInitialMessages && currentMessageIndex < messages.length)) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <span className="text-rose-500 font-bold">❯</span>
            <div className="flex items-center">
              <span className="text-green-300 leading-relaxed">{displayedText}</span>
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="ml-0.5 w-2 h-5 bg-rose-500 inline-block shadow-lg shadow-rose-500/50"
                />
              )}
            </div>
          </motion.div>
        )}
        
        {/* Loading indicator when waiting */}
        {!showingInitialMessages && currentMessageIndex >= messages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 mt-4"
          >
            <div className="flex gap-1">
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0 }}
                className="w-1 h-1 bg-rose-500 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                className="w-1 h-1 bg-rose-500 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                className="w-1 h-1 bg-rose-500 rounded-full"
              />
            </div>
            <span className="text-xs">Process complete</span>
          </motion.div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="mt-4 pt-3 border-t border-gray-700/30">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-60"></div>
      </div>
    </motion.div>
  );
}
