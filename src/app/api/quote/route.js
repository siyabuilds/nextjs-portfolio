import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

/**
 * Quote API Route
 * Fetches a daily quote from MongoDB
 */

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("quotesdb");
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    const doc = await db.collection("dailyQuotes").findOne({ date: today });

    if (!doc) {
      return NextResponse.json(
        { message: "No quote found for today" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
