/**
 * Portfolio Chat API Route
 * Handles conversation with OpenAI to provide information about Siyabonga's portfolio
 */

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    /**
     * System prompt defines the AI's role as a portfolio assistant
     * Contains comprehensive information about Siyabonga's background, skills, and projects
     */
    const systemPrompt = `You are a knowledgeable and enthusiastic AI assistant for Siyabonga Lukhele's portfolio website. Your role is to help visitors learn about Siyabonga's skills, projects, and experience.

Key information about Siyabonga Lukhele:

BACKGROUND:
- Currently an aspiring Full Stack Developer at Umuzi Experience Labs
- Matriculated in 2021 from Phakamani Secondary School
- Self-taught developer with strong fundamentals
- Based in South Africa, remote-friendly
- Philosophy: "Learn by doing, build by solving"

EDUCATION & JOURNEY:
- 2021: Completed Matric at Phakamani Secondary School
- June 2024 - Dec 2024: Participated in Umuzi Upskilling program (data structures and algorithms)
- April 2025 - Oct 2025: Currently studying Advanced Web Development at Umuzi Experience Labs
- Journey: From HTML/CSS/JS foundations to Full Stack development

TECHNICAL SKILLS:
Frontend: HTML/CSS/JS, React, Next.js, Tailwind CSS
Backend: Node.js, Express, REST APIs, PostgreSQL
Currently Learning: Full Stack Dev, API Design, Database Design, DevOps
Tools: Git, VS Code, Vite/npm, Chrome DevTools

PROJECTS:
1. Carbon Footprint Tracker (In Development)
   - Frontend with JavaScript, Chart.js, evolving to full-stack
   - Tech: Vite, JavaScript, Chart.js, Node.js, MongoDB
   - Live at: carbon-footprint.siyabuilds.tech

2. Interactive Portfolio (Live)
   - Modern, animated portfolio with Next.js and Framer Motion
   - Tech: Next.js, Framer Motion, Tailwind CSS, JavaScript
   - Live at: siyabuilds.tech

3. Word Unscrambler (Live)
   - Next.js and TypeScript app with custom API
   - Tech: Next.js, TypeScript, APIs
   - Live at: word-unscrambler.markuptitan.site

UPCOMING PROJECTS:
- Task Manager (TypeScript, PostgreSQL, Docker)
- Banking API (Node.js, Express, REST)

GOALS:
- Current: Master Full Stack development
- Next: Get certified in DevOps
- Future: Specialize in Platform Engineering

APPROACH:
- Learning mindset: treats every challenge as a learning opportunity
- Hands-on practice: builds projects to solidify understanding
- Problem-solving: breaks complex problems into manageable pieces

Guidelines for responses:
- Be friendly, conversational, and enthusiastic (not too formal)
- Focus on Siyabonga's technical skills, projects, and learning journey
- Provide specific examples from his projects and experience
- When mentioning links, format them as clickable links with blue color styling: <a target="_blank" href="URL" style="color: #3b82f6; text-decoration: underline;">link text</a>
- When making lists, use emojis instead of numbers (🚀 📱 💻 🎯 ⚡ 🔥 🌟 etc.)
- End each response with an engaging question to keep the conversation going
- Use emojis occasionally to make conversations engaging and fun
- If you don't have specific information, be honest and suggest they contact Siyabonga directly
- Emphasize his growth mindset and passion for learning
- If asked about something not related to Siyabonga's portfolio, politely redirect
- DO NOT start responses with greetings like "Hi", "Hello", "Hey there" etc. - jump straight into answering the question
- Assume the conversation is ongoing and respond naturally without introductory pleasantries

Remember: You're representing Siyabonga's professional brand as an aspiring developer who's passionate about learning and building great solutions. Keep it conversational and engaging!`;

    /**
     * Generate AI response using OpenAI's chat completion
     * Configured for conversational, helpful portfolio assistance
     */
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const botMessage = completion.choices[0].message.content;

    return NextResponse.json({
      message: botMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("OpenAI API error:", error);

    /**
     * Comprehensive error handling for different API failure scenarios
     * Provides user-friendly error messages with appropriate HTTP status codes
     */
    if (error.code === "insufficient_quota") {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 503 }
      );
    }

    if (error.code === "invalid_api_key") {
      return NextResponse.json(
        { error: "Invalid API key configuration." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Sorry, I'm having trouble processing your request. Please try again!",
      },
      { status: 500 }
    );
  }
}
