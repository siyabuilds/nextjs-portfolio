import axios from "axios";

export async function generateSummary(quote, author) {
  const prompt = `In 2-3 sentences, relate this quote to modern tech (AI, cloud, DevOps): "${quote}" - ${
    author || "Unknown"
  }`;

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "You are an expert in explaining quotes in the context of modern technology. Be concise and punchy.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 80,
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
