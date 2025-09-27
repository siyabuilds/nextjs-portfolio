"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiRobot2Line } from "react-icons/ri";

const QuoteSection = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/quote");

        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }

        const data = await response.json();
        setQuoteData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10 text-center"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
          <div className="h-20 bg-white/20 rounded"></div>
        </div>
        <p className="text-white/60 text-sm font-mono mt-4">
          Loading daily wisdom...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-900/20 rounded-lg p-8 backdrop-blur-sm border border-red-500/30"
      >
        <div className="text-center space-y-4">
          <div className="text-red-400 text-2xl">⚠</div>
          <h3 className="text-red-300 font-mono text-sm">
            Error Loading Quote
          </h3>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!quoteData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Daily <span className="text-emerald-500">Philosophy</span>
      </h2>

      <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10 space-y-6">
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="text-emerald-500 text-4xl font-serif">"</div>
          <p className="text-white text-lg md:text-xl leading-relaxed italic">
            {quoteData.quote}
          </p>
          <div className="text-emerald-500 text-4xl font-serif rotate-180 inline-block">
            "
          </div>
        </motion.blockquote>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-emerald-500 font-mono text-sm">
            — {quoteData.author}
          </p>
        </motion.div>

        {/* AI Summary */}
        {quoteData["ai-summary"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-white/10 pt-6 space-y-4"
          >
            <h3 className="text-emerald-500 font-mono text-sm font-semibold flex items-center gap-2">
              <RiRobot2Line className="w-4 h-4 animate-pulse" />
              AI Perspective
            </h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-white/80 text-sm leading-relaxed">
                {quoteData["ai-summary"]}
              </p>
            </div>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center items-center space-x-2 pt-4">
          <div className="w-1 h-1 bg-emerald-500/50 rounded-full"></div>
          <div className="w-2 h-2 bg-emerald-500/70 rounded-full"></div>
          <div className="w-1 h-1 bg-emerald-500/50 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteSection;
