"use client";

import { Contributor } from "@/types";

interface ContributorsProps {
  contributors: Contributor[];
}

export default function Contributors({ contributors }: ContributorsProps) {
  if (contributors.length === 0) return null;

  const sorted = [...contributors].sort((a, b) => b.tweetsAdded - a.tweetsAdded);

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
          Open Source Community
        </span>
        <h2 className="text-3xl font-bold text-white mb-3">
          Our Contributors
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Amazing people who curate the best marketing tweets for everyone.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sorted.map((contributor) => {
          const handle = contributor.handle.replace("@", "");
          return (
            <a
              key={contributor.handle}
              href={`https://x.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-5 bg-slate-800/60 border border-slate-700/50 rounded-2xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={`https://unavatar.io/twitter/${handle}`}
                alt={contributor.name}
                className="w-14 h-14 rounded-full ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 transition-all mb-3"
              />
              <p className="text-white font-medium text-sm text-center truncate w-full">
                {contributor.name}
              </p>
              <p className="text-slate-400 text-xs truncate w-full text-center">
                {contributor.handle}
              </p>
              <div className="mt-2 px-2.5 py-0.5 bg-purple-500/15 rounded-full">
                <span className="text-purple-300 text-xs font-medium">
                  {contributor.tweetsAdded} {contributor.tweetsAdded === 1 ? "tweet" : "tweets"}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
