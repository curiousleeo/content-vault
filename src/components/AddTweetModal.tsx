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

const categoryDot: Record<string, string> = {
  "Content Strategy": "bg-[#d4ff00]",
  "Personal Branding": "bg-[#38bdf8]",
  "Community Building": "bg-[#fb923c]",
  "Web3 Marketing": "bg-[#c084fc]",
  "Copywriting": "bg-[#f472b6]",
  "Growth": "bg-[#4ade80]",
};

interface AddTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddTweetModal({ isOpen, onClose, onAdded }: AddTweetModalProps) {
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
      if (!res.ok) { setError(data.error || "Failed to fetch tweet"); return; }
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
                handle: contributorHandle.startsWith("@") ? contributorHandle.trim() : `@${contributorHandle.trim()}`,
                name: contributorName.trim() || contributorHandle.trim().replace("@", ""),
              }
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save tweet"); return; }
      setTweetUrl(""); setFetchedData(null); setStep("url");
      setCategory("Content Strategy"); setContributorHandle(""); setContributorName("");
      onAdded(); onClose();
    } catch {
      setError("Failed to save tweet.");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setTweetUrl(""); setFetchedData(null); setStep("url");
    setError(""); setCategory("Content Strategy");
    setContributorHandle(""); setContributorName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-[#111] border border-[#2a2a2a] rounded-2xl w-full max-w-lg p-6 shadow-2xl shadow-black/50">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-black text-white mb-1">Add a Tweet</h2>
        <p className="text-[#555] text-sm mb-6">Paste a tweet URL and we&apos;ll pull the content automatically.</p>

        {step === "url" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">
                Tweet URL
              </label>
              <input
                type="text"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://x.com/username/status/123..."
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#d4ff00]/40 focus:ring-1 focus:ring-[#d4ff00]/10 transition-all"
                onKeyDown={(e) => e.key === "Enter" && tweetUrl.trim() && handleFetch()}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleFetch}
              disabled={!tweetUrl.trim() || loading}
              className="w-full bg-[#d4ff00] hover:bg-[#c5f000] disabled:bg-[#1f1f1f] disabled:text-[#444] text-black font-bold py-3 rounded-lg transition-colors text-sm"
            >
              {loading ? "Fetching..." : "Fetch Tweet →"}
            </button>
          </div>
        )}

        {step === "review" && fetchedData && (
          <div className="space-y-4">
            {/* Preview */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-3">
                <img src={fetchedData.author.avatar} alt={fetchedData.author.name} className="w-9 h-9 rounded-full ring-1 ring-[#2a2a2a]" />
                <div>
                  <p className="text-white font-semibold text-sm">{fetchedData.author.name}</p>
                  <p className="text-[#555] text-xs">{fetchedData.author.handle}</p>
                </div>
              </div>
              <p className="text-[#ccc] text-sm leading-relaxed">{fetchedData.text}</p>
            </div>

            {/* Category picker */}
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      category === cat
                        ? "bg-[#1a1a1a] text-white border-[#3a3a3a]"
                        : "bg-[#0d0d0d] text-[#666] border-[#1f1f1f] hover:text-[#aaa] hover:border-[#2a2a2a]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${categoryDot[cat] || "bg-[#555]"} ${category === cat ? "opacity-100" : "opacity-40"}`} />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Contributor */}
            <div>
              <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">
                Your info (optional — we&apos;ll credit you!)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={contributorHandle}
                  onChange={(e) => setContributorHandle(e.target.value)}
                  placeholder="@handle"
                  className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#d4ff00]/30 transition-all"
                />
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#d4ff00]/30 transition-all"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => { setStep("url"); setFetchedData(null); setError(""); }}
                className="flex-1 bg-[#1a1a1a] hover:bg-[#222] text-[#aaa] hover:text-white font-medium py-2.5 rounded-lg text-sm transition-colors border border-[#2a2a2a]"
              >
                ← Back
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#d4ff00] hover:bg-[#c5f000] disabled:bg-[#1f1f1f] disabled:text-[#444] text-black font-bold py-2.5 rounded-lg text-sm transition-colors"
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
