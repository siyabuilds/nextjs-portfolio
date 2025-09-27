import axios from "axios";

export async function generateSummary(quote, author) {
  const prompt = `Explain the following quote in terms of today's technology landscape (cloud, AI, web dev, DevOps, security). Keep it concise (2-4 sentences).\n\nQuote: "${quote}"\nAuthor: "${
    author || "Unknown"
  }"`;

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert in explaining quotes in the context of modern technology.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return (
      res.data.choices[0]?.message?.content?.trim() ||
      "AI summary unavailable today."
    );
  } catch (err) {
    console.error(
      "OpenAI error:",
      err.response ? err.response.data : err.message
    );
    return "AI summary unavailable today.";
  }
}
