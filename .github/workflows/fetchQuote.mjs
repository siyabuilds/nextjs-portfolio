import axios from "axios";

export async function fetchQuote() {
  const apiKey = process.env.API_NINJA_KEY;

  try {
    const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": apiKey },
    });

    if (Array.isArray(res.data) && res.data.length > 0) return res.data[0];
  } catch (err) {
    console.error("API Ninjas fetch error:", err.message);
  }

  // fallback quotes in case of API failure
  const fallback = [
    {
      quote: "Code is like humor. When you have to explain it, it’s bad.",
      author: "Cory House",
    },
    {
      quote: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}
