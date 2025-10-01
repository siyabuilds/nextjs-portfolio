# Siyabuils' Next.js Portfolio 🚀

_A modern, interactive portfolio that's way cooler than your average developer site_

## What's Inside

This isn't just another portfolio—it's a showcase built with some seriously fun tech. Think animated typing effects, an AI chat buddy, daily quotes that actually matter, and GitHub repos that update themselves.

**The Stack:**

- Next.js 15 + React 19 (because we like building on the edge)
- Framer Motion for buttery smooth animations
- Tailwind CSS for styling that doesn't suck
- MongoDB + OpenAI for the smart stuff
- Vercel for deployment magic

**The Cool Stuff:**

- 🎨 Animations that'll make you go "ooh"
- 🤖 AI assistant that knows way too much about me
- 📅 Daily quotes with tech-savvy summaries
- 🔗 Live GitHub integration (no manual updates needed!)
- 📱 Works great on mobile too
- ⚡ IDE vibes throughout

## How It's Built

```
src/app/
├── components/    # The fun, reusable stuff
├── api/          # Backend magic (chat, quotes, GitHub)
├── pages/        # Your destinations
└── lib/          # The boring but necessary utilities
```

**Where to go:**

- `/` - First impressions with animated intro
- `/about` - My story + daily wisdom
- `/projects` - The goods (with live GitHub data)
- `/chat` - Talk to my AI assistant
- `/contact` - Let's connect

## The Star Components

### Hero Section (`Hero.jsx`)

Landing page that types itself into existence. Built with Typed.js and Framer Motion because static text is for quitters.

### Projects Showcase (`ProjectsSection.jsx`)

My portfolio projects with smart filtering and live GitHub integration. No more "oops, forgot to update this" moments.

**Project structure:**

```javascript
{
  title: "Cool Project",
  description: "What it does",
  tech: ["React", "Node.js"],
  status: "Live" | "Building" | "Planning",
  demoUrl: "https://...",
  codeUrl: "https://github.com/..."
}
```

### AI Chat (`chat/page.js`)

An AI that knows everything about me (maybe too much). Conversations persist locally, so you won't lose your train of thought.

**Chat features:**

- Remembers what you talked about
- Types like a human (with that satisfying delay)
- Actually knows my portfolio inside and out
- Only answers questions about this portfolio and me, no off-topic chats

### Quote of the Day (`QuoteSection.jsx`)

Daily motivation with AI-generated tech context. Because generic quotes are boring.

### GitHub Integration (`GitHubRepos.jsx`)

Live repo data straight from GitHub. Stats, languages, stars—all the good stuff, automatically updated.

### The Supporting Cast

**CodeBlock** - Syntax highlighting that doesn't hurt your eyes, plus one-click copying.

**TerminalLoader** - Loading animations with a terminal feel.

**Navbar** - Responsive navigation with mobile responsiveness.

**Contact** - Forms that actually work (thanks Formspree!).

## The API Magic

### Chat with AI (`/api/chat`)

Powers the portfolio assistant. Send a message, get back intelligent responses about my work, experience, and projects.

```javascript
// What you send
{ message: "Tell me about your projects" }

// What you get back
{ message: "Let me tell you about some cool stuff...", timestamp: "..." }
```

### GitHub Live Data (`/api/github-repos`)

Pulls real repo data so the projects section never gets stale.

### Daily Quotes (`/api/quote`)

Serves up motivational quotes with AI-generated tech context. Updates automatically every day at 5 AM UTC.

## The Daily Quote System

Here's how fresh motivation lands on the site every day:

**The Flow:**

1. GitHub Actions wakes up at 5 AM UTC
2. Grabs a quote from API Ninjas (with fallbacks)
3. OpenAI adds tech-savvy context
4. Everything gets saved to MongoDB
5. Visitors see relevant, daily inspiration

**What gets stored:**

```javascript
{
  date: "2025-01-01",
  quote: "First, solve the problem. Then, write the code.",
  author: "John Johnson",
  "ai-summary": "Perfect for DevOps workflows where you solve infrastructure issues before writing automation scripts..."
}
```

The whole thing runs itself—no manual quote hunting required.

## MongoDB Connection Strategy

**TL;DR**: Different approaches for dev vs production to avoid headaches.

**In Development:**
Uses a global instance to prevent Next.js hot reload from creating a million database connections. Your laptop will thank you.

**In Production:**
Fresh connections for each serverless function because that's how Vercel likes it. MongoDB's built-in pooling handles the rest.

```javascript
// Dev: One connection to rule them all
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}
// Prod: Fresh connections for serverless
else {
  client = new MongoClient(process.env.MONGO_URI);
  clientPromise = client.connect();
}
```

## Running & Deploying

**Local Development:**

```bash
npm run dev    # Start the magic
npm run build  # Make sure it works
npm run lint   # Keep the code clean
```

**Environment Variables You'll Need:**

```bash
MONGO_URI=           # Your MongoDB connection
OPENAI_API_KEY=      # For the chat AI
GH_API_TOKEN=        # GitHub repo data
API_NINJA_KEY=       # Daily quotes
```

**Deployment:**
Hosted on Vercel at [siyabuilds.tech](https://siyabuilds.tech) with automatic deployments from the main branch. GitHub Actions handle the daily quote updates.

**Key Dependencies:**

- `framer-motion` - For smooth animations
- `typed.js` - Typewriter effects
- `mongodb` - Database connection
- `openai` - AI chat functionality
- And the usual suspects (Next.js, React, Tailwind)

---

_Built with ❤️ by [siyabuilds](https://github.com/siyabuilds). Questions? The AI chat knows everything, or you can reach out directly!_
