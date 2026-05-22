import { useState } from "react";
import { PROMPTS, CATEGORIES } from "../data/mockData";
import PromptCard from "../components/PromptCard";

const SORT_OPTIONS = ["Popular", "New", "Price: Low", "Price: High"];

export default function BrowsePage({ setPage, setSelectedPrompt }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");

  const filtered = PROMPTS.filter(
    (p) =>
      p.approved &&
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sort === "Popular") return b.downloads - a.downloads;
    if (sort === "New") return b.id - a.id;
    return 0; // price same for all (৳1)
  });

  return (
    <div className="px-6 md:px-10 py-8 w-full max-w-7xl mx-auto">
      <h1 className="page-title mb-6">Browse Prompts</h1>

      {/* Search + Sort */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">🔍</span>
          <input
            className="!pl-9"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="!w-44"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full border text-sm cursor-pointer transition-all duration-200 ${
              category === c
                ? "border-brand-500 bg-surface-border text-brand-200"
                : "border-surface-border2 bg-transparent text-text-secondary hover:border-brand-500/50 hover:text-brand-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onClick={() => {
                setSelectedPrompt(p);
                setPage("prompt");
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-text-secondary">
          <div className="text-4xl mb-4">🔎</div>
          <p className="text-lg font-medium">No prompts found</p>
          <p className="text-sm mt-2">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}
