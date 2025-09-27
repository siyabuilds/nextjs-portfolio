"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Typed from "typed.js";

const STORAGE_KEY = "portfolio_chat_messages";
const MAX_MESSAGES = 50;

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const typedRefs = useRef({});

  /**
   * Initialize chat with persisted messages or default welcome message
   * Handles data restoration and format conversion for timestamps
   */
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error("Error loading saved messages:", error);
        initializeDefaultMessage();
      }
    } else {
      initializeDefaultMessage();
    }
  }, []);

  /**
   * Persist messages to localStorage for session continuity
   */
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const initializeDefaultMessage = () => {
    const introMessages = [
      "Hey! I&apos;m your portfolio AI assistant. Ask me anything about Siyabonga&apos;s work, skills, or projects! 🚀",
      "Welcome! Curious about Siyabonga&apos;s experience or projects? I&apos;m here to help. 🤖",
      "Hello! Want to know more about Siyabonga&apos;s skills or portfolio? Just ask! 💡",
      "Hi there! Siyabonga&apos;s portfolio AI at your service. What would you like to know? 📝",
      "Greetings! Ask me anything about Siyabonga&apos;s journey, skills, or achievements! 🌟",
    ];
    const randomIndex = Math.floor(Math.random() * introMessages.length);
    const defaultMessage = {
      id: 1,
      text: introMessages[randomIndex],
      sender: "bot",
      timestamp: new Date(),
      isTyping: false,
    };
    setMessages([defaultMessage]);
  };

  /**
   * Message management utilities
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    initializeDefaultMessage();
  };

  /**
   * Add new message with automatic message limit management
   * Preserves welcome message while maintaining recent conversation history
   */
  const addMessage = (newMessage) => {
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      if (updated.length > MAX_MESSAGES) {
        const welcomeMessage = updated[0];
        const recentMessages = updated.slice(-(MAX_MESSAGES - 1));
        return [welcomeMessage, ...recentMessages];
      }
      return updated;
    });
  };

  /**
   * Animated typing effect for bot messages using Typed.js
   * Creates typewriter animation and manages message state transitions
   */
  const startTypingEffect = (messageId, text) => {
    setTypingMessageId(messageId);

    setTimeout(() => {
      if (typedRefs.current[messageId]) {
        const typed = new Typed(typedRefs.current[messageId], {
          strings: [text],
          typeSpeed: 30,
          showCursor: false,
          onComplete: () => {
            setTypingMessageId(null);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === messageId ? { ...msg, isTyping: false } : msg
              )
            );
          },
        });

        return () => typed.destroy();
      }
    }, 100);
  };

  /**
   * Handle message submission and API communication
   * Manages user input, API calls, and bot response rendering with typing effects
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      };

      addMessage(botMessage);
      startTypingEffect(botMessage.id, data.message);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I&apos;m having trouble connecting right now. Please try again! 😅",
        sender: "bot",
        timestamp: new Date(),
        isTyping: false,
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 top-14 z-10 mt-6 w-full">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-500 font-mono">
              💬 Chat with Portfolio AI
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Ask me about Siyabonga&apos;s projects, skills, or experience! •{" "}
              {messages.length} messages
            </p>
          </div>
          <button
            onClick={clearChat}
            className="bg-gray-800 hover:bg-emerald-600 text-gray-300 hover:text-white p-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            title="Clear chat history"
          >
            <TrashIcon className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  {message.sender === "bot" && message.isTyping ? (
                    <div
                      ref={(el) => (typedRefs.current[message.id] = el)}
                      className="text-sm leading-relaxed whitespace-pre-line"
                    />
                  ) : (
                    <div
                      className="text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: message.text.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-slate-400">$1</strong>'
                        ),
                      }}
                    />
                  )}
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp && message.timestamp.toLocaleTimeString
                      ? message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Now"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 text-gray-100 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="bg-gray-900 border-t border-gray-800 p-4 sticky bottom-8 z-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={sendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full border border-gray-700 focus:outline-none focus:border-emerald-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
