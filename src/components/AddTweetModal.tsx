"use client";

import { useState } from "react";
import { Category } from "@/types";

const CATEGORIES: Category[] = [
  "Content Strategy",
  "Personal Branding",
  "Community Building",
  "Web3 Marketing",
  "Copywriting",
  "Growth",
];

interface AddTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddTweetModal({
  isOpen,
  onClose,
  onAdded,
}: AddTweetModalProps) {
  const [tweetUrl, setTweetUrl] = useState("");
  const [category, setCategory] = useState<Category>("Content Strategy");
  const [fetchedData, setFetchedData] = useState<{
    text: string;
    author: { name: string; handle: string; avatar: string };
    tweetUrl: string;
  } | null>(null);
  const [contributorHandle, setContributorHandle] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"url" | "review">("url");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/fetch-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tweetUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch tweet");
        return;
      }
      setFetchedData(data);
      setStep("review");
    } catch {
      setError("Failed to fetch tweet. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!fetchedData) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fetchedData.text,
          author: fetchedData.author,
          category,
          tweetUrl: fetchedData.tweetUrl,
          contributedBy: contributorHandle.trim()
            ? {
                handle: contributorHandle.startsWith("@")
                  ? contributorHandle.trim()
                  : `@${contributorHandle.trim()}`,
                name: contributorName.trim() || contributorHandle.trim().replace("@", ""),
              }
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save tweet");
        return;
      }
      // Reset and close
      setTweetUrl("");
      setFetchedData(null);
      setStep("url");
      setCategory("Content Strategy");
      setContributorHandle("");
      setContributorName("");
      onAdded();
      onClose();
    } catch {
      setError("Failed to save tweet.");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setTweetUrl("");
    setFetchedData(null);
    setStep("url");
    setError("");
    setCategory("Content Strategy");
    setContributorHandle("");
    setContributorName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Add Tweet</h2>

        {step === "url" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Paste Tweet URL
              </label>
              <input
                type="text"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://x.com/username/status/123456789"
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && tweetUrl.trim() && handleFetch()}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              onClick={handleFetch}
              disabled={!tweetUrl.trim() || loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3 rounded-xl transition-colors"
            >
              {loading ? "Fetching..." : "Fetch Tweet"}
            </button>
          </div>
        )}

        {step === "review" && fetchedData && (
          <div className="space-y-4">
            {/* Preview */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={fetchedData.author.avatar}
                  alt={fetchedData.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-white font-medium text-sm">{fetchedData.author.name}</p>
                  <p className="text-slate-400 text-xs">{fetchedData.author.handle}</p>
                </div>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{fetchedData.text}</p>
            </div>

            {/* Category picker */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Pick a Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      category === cat
                        ? "bg-purple-500/30 text-purple-300 border-purple-500"
                        : "bg-slate-700/50 text-slate-400 border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Contributor info */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Twitter Handle (so we can credit you!)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={contributorHandle}
                  onChange={(e) => setContributorHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                />
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Your Name"
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStep("url");
                  setFetchedData(null);
                  setError("");
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3 rounded-xl transition-colors"
              >
                {saving ? "Saving..." : "Save Tweet"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
