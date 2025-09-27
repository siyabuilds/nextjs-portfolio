import { MongoClient } from "mongodb";
import { fetchQuote } from "./fetchQuote.mjs";
import { generateSummary } from "./generateSummary.mjs";

async function main() {
  const q = await fetchQuote();
  const today = new Date().toISOString().slice(0, 10);
  const aiSummary = await generateSummary(q.quote, q.author);

  const doc = {
    date: today,
    quote: q.quote,
    author: q.author || "Unknown",
    "ai-summary": aiSummary,
  };

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  await client
    .db("quotesDB")
    .collection("dailyQuotes")
    .updateOne({ date: today }, { $set: doc }, { upsert: true });
  console.log("Updated daily quote:", doc);
  await client.close();
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
