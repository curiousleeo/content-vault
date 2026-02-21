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
  // Extract unique authors and count their tweets
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

  const authors = Array.from(authorsMap.values()).sort(
    (a, b) => b.tweetCount - a.tweetCount
  );

  if (authors.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
          Brilliant Minds
        </span>
        <h2 className="text-3xl font-bold text-white mb-3">
          Tweet Authors
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          The marketing experts whose wisdom is featured here. Follow them for more insights.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {authors.map((author) => {
          const handle = author.handle.replace("@", "");
          return (
            <a
              key={author.handle}
              href={`https://x.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-5 bg-slate-800/60 border border-slate-700/50 rounded-2xl hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-14 h-14 rounded-full ring-2 ring-cyan-500/30 group-hover:ring-cyan-500/60 transition-all mb-3"
              />
              <p className="text-white font-medium text-sm text-center truncate w-full">
                {author.name}
              </p>
              <p className="text-slate-400 text-xs truncate w-full text-center">
                {author.handle}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 bg-cyan-500/15 rounded-full text-cyan-300 text-xs font-medium">
                  {author.tweetCount} {author.tweetCount === 1 ? "tweet" : "tweets"}
                </span>
              </div>
              <span className="mt-2 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                Follow &rarr;
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
