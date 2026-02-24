"use client";

import { useState, useMemo, useCallback } from "react";
import { Tweet, Category, SortOption, Contributor } from "@/types";
import tweetsData from "@/data/tweets.json";
import contributorsData from "@/data/contributors.json";
import TweetCard from "@/components/TweetCard";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import Header from "@/components/Header";
import AddTweetModal from "@/components/AddTweetModal";
import Contributors from "@/components/Contributors";
import AuthorsShowcase from "@/components/AuthorsShowcase";

const CATEGORIES: Category[] = [
  "Content Strategy",
  "Personal Branding",
  "Community Building",
  "Web3 Marketing",
  "Copywriting",
  "Growth",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleTweetAdded = useCallback(() => {
    window.location.reload();
  }, []);

  const tweets = tweetsData.tweets as Tweet[];
  const contributors = contributorsData.contributors as Contributor[];

  // Unique author count
  const authorCount = useMemo(() => {
    const handles = new Set(tweets.map((t) => t.author.handle.toLowerCase()));
    return handles.size;
  }, [tweets]);

  const filteredAndSortedTweets = useMemo(() => {
    let result = [...tweets];

    if (selectedCategory !== "All") {
      result = result.filter((tweet) => tweet.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tweet) =>
          tweet.text.toLowerCase().includes(query) ||
          tweet.author.name.toLowerCase().includes(query) ||
          tweet.author.handle.toLowerCase().includes(query) ||
          tweet.category.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "upvotes":
          return (b.upvotes || 0) - (a.upvotes || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [tweets, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Header tweetCount={tweets.length} authorCount={authorCount} />

        {/* Controls */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="flex gap-2 shrink-0">
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#d4ff00] hover:bg-[#c5f000] text-black font-bold text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Add Tweet
              </button>
            </div>
          </div>

          <FilterBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-6">
          <p className="text-[#555] text-sm">
            <span className="text-white font-semibold">{filteredAndSortedTweets.length}</span>{" "}
            {filteredAndSortedTweets.length === 1 ? "tweet" : "tweets"}
            {selectedCategory !== "All" && (
              <span> in <span className="text-[#d4ff00]">{selectedCategory}</span></span>
            )}
          </p>
          <div className="flex-1 h-px bg-[#1a1a1a]" />
        </div>

        {/* Tweets Grid */}
        {filteredAndSortedTweets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedTweets.map((tweet, index) => (
              <div
                key={tweet.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <TweetCard tweet={tweet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">—</p>
            <h3 className="text-lg font-bold text-white mb-2">Nothing found</h3>
            <p className="text-[#555] text-sm">Try a different search or category</p>
          </div>
        )}

        {/* Authors Showcase */}
        <AuthorsShowcase tweets={tweets} />

        {/* Contributors */}
        <Contributors contributors={contributors} />

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#1a1a1a]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#333] text-sm font-bold tracking-widest uppercase">
              Marketing Tweet Vault
            </p>
            <p className="text-[#333] text-xs">
              Open source · Add your favorites · Upvote the best
            </p>
          </div>
        </footer>
      </div>

      <AddTweetModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={handleTweetAdded}
      />
    </main>
  );
}
