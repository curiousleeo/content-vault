"use client";

import { Category } from "@/types";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
}

const categoryColors: Record<string, string> = {
  "All": "from-purple-500 to-blue-500",
  "Content Strategy": "from-purple-500 to-purple-600",
  "Personal Branding": "from-blue-500 to-blue-600",
  "Community Building": "from-green-500 to-green-600",
  "Web3 Marketing": "from-cyan-500 to-cyan-600",
  "Copywriting": "from-pink-500 to-pink-600",
  "Growth": "from-orange-500 to-orange-600",
};

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const allCategories: (Category | "All")[] = ["All", ...categories];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-2">
      <div className="flex flex-wrap gap-2 justify-center min-w-max px-4 md:px-0">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  isSelected
                    ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg shadow-purple-500/25`
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                }
              `}
            >
              {category}
              {isSelected && (
                <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
