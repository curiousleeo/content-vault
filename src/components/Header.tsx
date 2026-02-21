"use client";

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        <span className="text-purple-300 text-sm font-medium">
          Curated Marketing Wisdom
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Marketing Tweets
        </span>
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Repository
        </span>
      </h1>

      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
        A curated collection of the best marketing insights from Twitter.
        Filter, search, and discover strategies that work.
      </p>
    </header>
  );
}
