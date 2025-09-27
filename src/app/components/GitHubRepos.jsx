"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiStar,
  FiGitBranch,
  FiExternalLink,
  FiGithub,
  FiLoader,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/github-repos");

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepos(data.repos || []);
        setUserData(data.user || null);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-emerald-500",
      Python: "bg-green-400",
      HTML: "bg-orange-400",
      CSS: "bg-purple-400",
      React: "bg-cyan-400",
      "Next.js": "bg-gray-400",
    };
    return colors[language] || "bg-gray-400";
  };

  const getYearsOnGitHub = (createdAt) => {
    if (!createdAt) return null;
    const created = new Date(createdAt);
    const now = new Date();
    const years = Math.floor((now - created) / (365.25 * 24 * 60 * 60 * 1000));
    return years;
  };

  if (loading) {
    return (
      <div className="text-center space-y-6 bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-center space-x-2">
          <FiLoader className="animate-spin text-emerald-500 text-2xl" />
          <span className="text-white/70">Loading GitHub repositories...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-6 bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
        <div className="text-red-400">
          <FiGithub className="text-4xl mx-auto mb-2" />
          <p>Failed to load repositories</p>
          <p className="text-sm text-white/50 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white/5 rounded-lg p-8 backdrop-blur-sm border border-white/10">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FiGithub className="text-6xl text-white mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold">
          Featured <span className="text-emerald-500">Repositories</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore my latest projects and contributions on GitHub. Each
          repository represents a journey of learning, building, and sharing
          knowledge.
        </p>
        {userData && (
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center space-x-2 text-emerald-500">
              <FiUsers className="text-lg" />
              <span className="text-sm font-mono">
                {userData.followers} followers
              </span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <FiGithub className="text-lg" />
              <span className="text-sm font-mono">
                {userData.publicRepos} repositories
              </span>
            </div>
            {userData.createdAt && (
              <div className="flex items-center space-x-2 text-blue-400">
                <FiCalendar className="text-lg" />
                <span className="text-sm font-mono">
                  {getYearsOnGitHub(userData.createdAt)} years on GitHub
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Repositories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6 mt-8"
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            variants={cardVariants}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
          >
            {/* Repo Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-500 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-white/60 text-sm mt-1 line-clamp-2">
                  {repo.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 mb-4 text-sm">
              <div className="flex items-center space-x-1 text-yellow-400">
                <FiStar className="text-xs" />
                <span>{repo.stars}</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-500">
                <FiGitBranch className="text-xs" />
                <span>{repo.forks}</span>
              </div>
              {repo.language && (
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getLanguageColor(
                      repo.language
                    )}`}
                  />
                  <span className="text-white/70 text-xs">{repo.language}</span>
                </div>
              )}
            </div>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="text-white/50 text-xs px-2 py-1">
                      +{repo.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-1 py-2 px-4 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white rounded font-mono text-xs transition-all duration-300"
              >
                <FiGithub className="text-sm" />
                <span>Code</span>
              </a>

              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 py-2 px-4 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black rounded font-mono text-xs transition-all duration-300"
                >
                  <FiExternalLink className="text-sm" />
                  <span>Live</span>
                </a>
              )}
            </div>

            {/* Last Updated */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-white/40 font-mono">
                Updated {new Date(repo.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub Profile Link */}
      <div className="text-center pt-6">
        <a
          href="https://github.com/siyabuilds"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-emerald-500 text-black px-6 py-3 rounded font-mono text-sm hover:bg-slate-400 transition-colors"
        >
          <FiGithub />
          <span>View All Repositories</span>
        </a>
      </div>
    </div>
  );
};

export default GitHubRepos;
