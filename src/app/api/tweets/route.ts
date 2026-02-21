import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TWEETS_FILE = path.join(process.cwd(), "src/data/tweets.json");
const CONTRIBUTORS_FILE = path.join(process.cwd(), "src/data/contributors.json");

export async function POST(req: NextRequest) {
  try {
    const newTweet = await req.json();

    if (!newTweet.text || !newTweet.category) {
      return NextResponse.json(
        { error: "Tweet text and category are required" },
        { status: 400 }
      );
    }

    const fileContent = fs.readFileSync(TWEETS_FILE, "utf-8");
    const data = JSON.parse(fileContent);

    // Generate next ID
    const maxId = data.tweets.reduce(
      (max: number, t: { id: string }) => Math.max(max, parseInt(t.id) || 0),
      0
    );

    const tweet = {
      id: String(maxId + 1),
      text: newTweet.text,
      author: newTweet.author || {
        name: "Unknown",
        handle: "@unknown",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      category: newTweet.category,
      date: new Date().toISOString().split("T")[0],
      likes: newTweet.likes || 0,
      retweets: newTweet.retweets || 0,
      bookmarks: newTweet.bookmarks || 0,
      tweetUrl: newTweet.tweetUrl || "",
      upvotes: 0,
      contributedBy: newTweet.contributedBy || undefined,
    };

    data.tweets.unshift(tweet);
    fs.writeFileSync(TWEETS_FILE, JSON.stringify(data, null, 2) + "\n");

    // Update contributors if contributedBy is provided
    if (newTweet.contributedBy?.handle) {
      const contribContent = fs.readFileSync(CONTRIBUTORS_FILE, "utf-8");
      const contribData = JSON.parse(contribContent);

      const handle = newTweet.contributedBy.handle;
      const existing = contribData.contributors.find(
        (c: { handle: string }) => c.handle.toLowerCase() === handle.toLowerCase()
      );

      if (existing) {
        existing.tweetsAdded += 1;
      } else {
        contribData.contributors.push({
          handle: handle,
          name: newTweet.contributedBy.name || handle.replace("@", ""),
          tweetsAdded: 1,
          joinedDate: new Date().toISOString().split("T")[0],
        });
      }

      fs.writeFileSync(
        CONTRIBUTORS_FILE,
        JSON.stringify(contribData, null, 2) + "\n"
      );
    }

    return NextResponse.json({ success: true, tweet });
  } catch (error) {
    console.error("Save tweet error:", error);
    return NextResponse.json(
      { error: "Failed to save tweet" },
      { status: 500 }
    );
  }
}
