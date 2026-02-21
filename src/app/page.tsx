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
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTweetAdded = useCallback(() => {
    setRefreshKey((k) => k + 1);
    window.location.reload();
  }, []);

  const tweets = tweetsData.tweets as Tweet[];
  const contributors = contributorsData.contributors as Contributor[];

  const filteredAndSortedTweets = useMemo(() => {
    let result = [...tweets];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((tweet) => tweet.category === selectedCategory);
    }

    // Filter by search query
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

    // Sort
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
    <main className="min-h-screen bg-gradient-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Header />

        {/* Controls Section */}
        <div className="space-y-6 mb-10">
          {/* Search, Sort, and Add Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Tweet
            </button>
          </div>

          {/* Filter Bar */}
          <FilterBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm">
            Showing{" "}
            <span className="text-purple-400 font-semibold">
              {filteredAndSortedTweets.length}
            </span>{" "}
            {filteredAndSortedTweets.length === 1 ? "tweet" : "tweets"}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="text-purple-400 font-semibold">
                  {selectedCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Tweets Grid */}
        {filteredAndSortedTweets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTweets.map((tweet, index) => (
              <div
                key={tweet.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TweetCard tweet={tweet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No tweets found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Authors Showcase */}
        <AuthorsShowcase tweets={tweets} />

        {/* Contributors */}
        <Contributors contributors={contributors} />

        {/* Footer */}
        <footer className="mt-20 text-center border-t border-slate-800 pt-8">
          <p className="text-slate-500 text-sm">
            Made with{" "}
            <span className="text-red-400">♥</span> for marketers everywhere
          </p>
        </footer>
      </div>
      {/* Add Tweet Modal */}
      <AddTweetModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={handleTweetAdded}
      />
    </main>
  );
}
