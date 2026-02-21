import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize twitter.com / x.com URLs
    const tweetUrl = url.trim();
    const tweetMatch = tweetUrl.match(
      /(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/
    );

    if (!tweetMatch) {
      return NextResponse.json(
        { error: "Invalid tweet URL. Use a twitter.com or x.com status link." },
        { status: 400 }
      );
    }

    const handle = tweetMatch[1];

    // Use Twitter's public oEmbed API (no auth needed)
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&omit_script=true`;
    const oembedRes = await fetch(oembedUrl);

    if (!oembedRes.ok) {
      return NextResponse.json(
        { error: "Could not fetch tweet. It may be private or deleted." },
        { status: 404 }
      );
    }

    const oembed = await oembedRes.json();

    // Extract clean text from the HTML response
    // oEmbed returns HTML like: <blockquote>...<p>tweet text</p>... &mdash; Author Name (@handle)</blockquote>
    const htmlContent = oembed.html || "";

    // Extract tweet text from <p> tags
    const pMatch = htmlContent.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    let tweetText = pMatch ? pMatch[1] : "";
    // Clean HTML tags and entities
    tweetText = tweetText
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, "—")
      .trim();

    // Extract author name from oembed.author_name
    const authorName = oembed.author_name || handle;

    return NextResponse.json({
      text: tweetText,
      author: {
        name: authorName,
        handle: `@${handle}`,
        avatar: `https://unavatar.io/twitter/${handle}`,
      },
      tweetUrl: tweetUrl,
    });
  } catch (error) {
    console.error("Fetch tweet error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweet" },
      { status: 500 }
    );
  }
}
