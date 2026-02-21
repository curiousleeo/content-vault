import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TWEETS_FILE = path.join(process.cwd(), "src/data/tweets.json");

export async function POST(req: NextRequest) {
  try {
    const { tweetId } = await req.json();

    if (!tweetId) {
      return NextResponse.json(
        { error: "tweetId is required" },
        { status: 400 }
      );
    }

    const fileContent = fs.readFileSync(TWEETS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    const tweet = data.tweets.find(
      (t: { id: string }) => t.id === String(tweetId)
    );

    if (!tweet) {
      return NextResponse.json(
        { error: "Tweet not found" },
        { status: 404 }
      );
    }

    tweet.upvotes = (tweet.upvotes || 0) + 1;

    fs.writeFileSync(TWEETS_FILE, JSON.stringify(data, null, 2) + "\n");

    return NextResponse.json({ success: true, upvotes: tweet.upvotes });
  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json(
      { error: "Failed to upvote" },
      { status: 500 }
    );
  }
}
