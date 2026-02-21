"use client";

import { useState, useEffect } from "react";
import { Tweet } from "@/types";
import Image from "next/image";

interface TweetCardProps {
  tweet: Tweet;
}

const categoryColors: Record<string, string> = {
  "Content Strategy": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Personal Branding": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Community Building": "bg-green-500/20 text-green-300 border-green-500/30",
  "Web3 Marketing": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Copywriting": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Growth": "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getUpvotedTweets(): Set<string> {
  try {
    const stored = localStorage.getItem("upvotedTweets");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveUpvotedTweet(tweetId: string) {
  try {
    const upvoted = getUpvotedTweets();
    upvoted.add(tweetId);
    localStorage.setItem("upvotedTweets", JSON.stringify(Array.from(upvoted)));
  } catch {
    // localStorage not available
  }
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const [upvotes, setUpvotes] = useState(tweet.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoting, setUpvoting] = useState(false);

  useEffect(() => {
    setHasUpvoted(getUpvotedTweets().has(tweet.id));
  }, [tweet.id]);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasUpvoted || upvoting) return;

    setUpvoting(true);
    try {
      const res = await fetch("/api/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetId: tweet.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setUpvotes(data.upvotes);
        setHasUpvoted(true);
        saveUpvotedTweet(tweet.id);
      }
    } catch {
      // silently fail
    } finally {
      setUpvoting(false);
    }
  };

  const cardContent = (
    <>
      {/* Category Badge + Upvote */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
            categoryColors[tweet.category] || "bg-slate-500/20 text-slate-300"
          }`}
        >
          {tweet.category}
        </span>
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted || upvoting}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            hasUpvoted
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
              : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/40"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          {upvotes}
        </button>
      </div>

      {/* Tweet Text */}
      <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-6">
        {tweet.text}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
          <Image
            src={tweet.author.avatar}
            alt={tweet.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-medium text-sm">{tweet.author.name}</p>
          <p className="text-slate-400 text-xs">{tweet.author.handle}</p>
        </div>
      </div>

      {/* Footer: Date and Contributor */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">{formatDate(tweet.date)}</span>
          {tweet.contributedBy && (
            <span className="text-slate-500 text-xs mt-0.5">
              Added by{" "}
              <span className="text-purple-400">{tweet.contributedBy.handle}</span>
            </span>
          )}
        </div>
        {tweet.tweetUrl && (
          <span className="text-slate-500 text-xs hover:text-purple-400 transition-colors">
            View original &rarr;
          </span>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </>
  );

  const cardClass = "group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer";

  if (tweet.tweetUrl) {
    return (
      <a href={tweet.tweetUrl} target="_blank" rel="noopener noreferrer" className={`block ${cardClass}`}>
        {cardContent}
      </a>
    );
  }

  return <div className={cardClass}>{cardContent}</div>;
}
