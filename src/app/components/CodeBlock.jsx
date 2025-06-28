"use client";

import React, { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

// Create a more refined custom theme based on VS Dark
const customTheme = JSON.parse(JSON.stringify(themes.vsDark));

// Color palette for better syntax highlighting contrast and readability
const propertyColor = "hsl(260, 85%, 75%)";
const stringColor = "hsl(120, 60%, 70%)";
const numberColor = "hsl(210, 90%, 75%)";
const booleanColor = "hsl(30, 90%, 70%)";
const commentColor = "hsl(90, 20%, 55%)";
const keywordColor = "hsl(330, 80%, 75%)";

// Apply enhanced styling to the theme
customTheme.styles.push(
  {
    types: ["property"],
    style: {
      color: propertyColor,
    },
  },
  {
    types: ["string"],
    style: {
      color: stringColor,
    },
  },
  {
    types: ["number"],
    style: {
      color: numberColor,
    },
  },
  {
    types: ["boolean"],
    style: {
      color: booleanColor,
    },
  },
  {
    types: ["comment"],
    style: {
      color: commentColor,
      fontStyle: "italic",
    },
  },
  {
    types: ["keyword"],
    style: {
      color: keywordColor,
    },
  }
);

// Update background color for better contrast
customTheme.plain.backgroundColor = "#151518";

export const CodeBlock = ({ codeString, language, title }) => {
  const [buttonText, setButtonText] = useState("Copy");
  const [isHovering, setIsHovering] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setButtonText("Failed!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 2000);
      });
  };

  // Reset button text when component unmounts or code changes
  useEffect(() => {
    return () => {
      setButtonText("Copy");
    };
  }, [codeString]);

  return (
    <div
      className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl overflow-hidden my-4 w-full max-w-2xl mx-auto border border-zinc-800"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced header with glassmorphism effect */}
      <div className="bg-black/50 backdrop-blur-sm flex items-center justify-between h-10 px-4 select-none border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full ring-1 ring-red-900 ring-inset"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full ring-1 ring-yellow-900 ring-inset"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full ring-1 ring-green-900 ring-inset"></div>
        </div>

        <div className="flex-1 min-w-0 px-2">
          {title && (
            <div className="text-center text-xs sm:text-sm text-gray-300 font-mono tracking-tight truncate">
              {title}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={`
              text-xs font-mono px-2 py-1 rounded-md 
              transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-400
              ${
                buttonText === "Copied!"
                  ? "bg-green-600/20 text-green-400 border border-green-600/40"
                  : "bg-zinc-800/80 text-gray-300 hover:text-white hover:bg-zinc-700/80 border border-zinc-700"
              }
            `}
          >
            <span className="flex items-center gap-1">
              {buttonText === "Copied!" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {buttonText}
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  {buttonText}
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <Highlight
        theme={customTheme}
        code={codeString.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            {/* Add subtle gradient effect when hovering */}
            {isHovering && (
              <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none" />
            )}

            <pre
              className={`${className} p-0 text-sm overflow-x-auto leading-relaxed text-left font-mono`}
              style={{
                ...style,
                backgroundColor: "transparent",
              }}
            >
              <code className="grid">
                {tokens.map((line, i) => (
                  <div
                    {...getLineProps({ line, key: i })}
                    key={i}
                    className="table-row"
                  >
                    {/* Add line numbers */}
                    <span className="table-cell text-right pr-4 select-none opacity-50 text-xs border-r border-zinc-700/50 px-2">
                      {i + 1}
                    </span>
                    <span className="table-cell pl-4">
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} key={key} />
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
