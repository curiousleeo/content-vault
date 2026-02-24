"use client";

import { Tweet } from "@/types";

interface AuthorsShowcaseProps {
  tweets: Tweet[];
}

interface AuthorInfo {
  name: string;
  handle: string;
  avatar: string;
  tweetCount: number;
}

export default function AuthorsShowcase({ tweets }: AuthorsShowcaseProps) {
  const authorsMap = new Map<string, AuthorInfo>();
  tweets.forEach((tweet) => {
    const key = tweet.author.handle.toLowerCase();
    const existing = authorsMap.get(key);
    if (existing) {
      existing.tweetCount += 1;
    } else {
      authorsMap.set(key, {
        name: tweet.author.name,
        handle: tweet.author.handle,
        avatar: tweet.author.avatar,
        tweetCount: 1,
      });
    }
  });

  const authors = Array.from(authorsMap.values()).sort((a, b) => b.tweetCount - a.tweetCount);
  if (authors.length === 0) return null;

  return (
    <section className="mt-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#d4ff00] text-xs font-bold tracking-widest uppercase mb-2">
            Brilliant Minds
          </p>
          <h2 className="text-2xl font-black text-white">
            Featured Authors
          </h2>
        </div>
        <p className="text-[#555] text-sm hidden sm:block">
          Follow them for more insights
        </p>
      </div>

      <div className="accent-line mb-8" />

      {/* Authors horizontal scroll on mobile, grid on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {authors.map((author) => {
          const handle = author.handle.replace("@", "");
          return (
            <a
              key={author.handle}
              href={`https://x.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-4 bg-[#111] border border-[#1f1f1f] rounded-xl hover:border-[#2f2f2f] hover:bg-[#161616] transition-all duration-150"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full ring-2 ring-[#1f1f1f] group-hover:ring-[#d4ff00]/30 transition-all mb-3 object-cover"
              />
              <p className="text-white font-semibold text-xs text-center truncate w-full">
                {author.name}
              </p>
              <p className="text-[#555] text-xs truncate w-full text-center mb-2">
                {author.handle}
              </p>
              <span className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-[#666] text-xs">
                {author.tweetCount}×
              </span>
              <span className="mt-2 text-[10px] text-[#444] group-hover:text-[#d4ff00] transition-colors font-medium">
                Follow →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
