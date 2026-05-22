import { useState } from "react";
import { PROMPTS } from "../data/mockData";
import PromptCard from "../components/PromptCard";

const GRADIENTS = [
  "from-green-900 via-emerald-900 to-teal-900",
  "from-violet-900 via-purple-900 to-indigo-900",
  "from-amber-900 via-yellow-900 to-orange-900",
  "from-pink-900 via-rose-900 to-red-900",
  "from-blue-900 via-cyan-900 to-sky-900",
  "from-fuchsia-900 via-purple-900 to-violet-900",
];

export default function PromptPage({ prompt, setPage, user, setSelectedPrompt }) {
  const [purchased, setPurchased] = useState(false);

  if (!prompt) {
    return (
      <div className="p-10 text-center text-text-secondary">
        <p>No prompt selected.</p>
        <button className="btn-ghost mt-4" onClick={() => setPage("browse")}>← Browse Prompts</button>
      </div>
    );
  }

  const gradient = GRADIENTS[prompt.id % GRADIENTS.length];
  const related = PROMPTS.filter((p) => p.approved && p.id !== prompt.id).slice(0, 3);

  const handleBuy = () => {
    if (!user) {
      setPage("login");
    } else {
      setPurchased(true);
    }
  };

  return (
    <div className="px-6 xl:px-0 py-8 max-w-7xl mx-auto">
      {/* Back */}
      <button
        onClick={() => setPage("browse")}
        className="text-text-secondary text-sm mb-6 flex items-center gap-1 hover:text-brand-200 transition-colors bg-transparent border-0 cursor-pointer"
      >
        ← Back to Browse
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left: Preview */}
        <div>
          <div className={`w-full aspect-square bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-8xl mb-4 relative overflow-hidden`}>
            <span className="relative z-10 drop-shadow-2xl">{prompt.preview}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Prompt Preview Box */}
          <div className="card p-4">
            <div className="text-xs text-text-secondary mb-2 font-semibold uppercase tracking-wider">
              Prompt Text
            </div>
            <p className={`font-mono text-sm leading-relaxed transition-all duration-500 ${purchased ? "text-brand-200" : "text-text-secondary blur-sm select-none"}`}>
              {purchased ? prompt.prompt : "██████ ███ ██████ ██ ██████ ██████, ██████████ █████ ████ ██████, ███████████, ██ ████ ████████..."}
            </p>
            {purchased && (
              <button
                className="btn-ghost !text-xs !py-1.5 !px-3 mt-3"
                onClick={() => navigator.clipboard.writeText(prompt.prompt)}
              >
                📋 Copy Prompt
              </button>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="badge badge-purple mb-3 inline-block">{prompt.category}</span>
          <h1 className="font-syne text-3xl font-bold mb-3">{prompt.title}</h1>

          {prompt.rating > 0 && (
            <div className="flex items-center gap-4 mb-5">
              <span className="text-amber-400 font-semibold">★ {prompt.rating}</span>
              <span className="text-text-secondary text-sm">{prompt.downloads.toLocaleString()} downloads</span>
            </div>
          )}

          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            A professionally crafted prompt for generating stunning {prompt.category.toLowerCase()} imagery.
            Works perfectly with Midjourney v6, DALL·E 3, and Stable Diffusion XL. Instant download after purchase.
          </p>
          </div>

          {/* Seller Card */}
          <div>
          <div className="card p-4 mb-6">
            <div className="text-xs text-text-secondary mb-3 font-semibold uppercase tracking-wider">Seller</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center font-bold text-sm shrink-0">
                {prompt.seller[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{prompt.seller}</div>
                <div className="text-xs text-text-secondary">240 prompts · ✅ Verified Seller</div>
              </div>
            </div>
          </div>

          {/* Price + Buy */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-syne text-4xl font-bold text-brand-400">$1</span>
            <span className="text-sm text-text-secondary">One-time purchase · Instant access</span>
          </div>

          {!purchased ? (
            <button className="btn-primary w-full !py-4 !text-base" onClick={handleBuy}>
              {user ? "💳 Buy & Download Now" : "Sign In to Purchase"}
            </button>
          ) : (
            <div className="w-full py-4 text-center rounded-xl bg-green-900/30 border border-green-800/50 text-green-400 font-semibold">
              ✓ Downloaded! Check your dashboard
            </div>
          )}

          {/* Trust Badges */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {["🔁 Works with MJ v6", "📱 Mobile-friendly", "✅ Instant delivery"].map((t) => (
              <span key={t} className="text-xs text-text-secondary">{t}</span>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Related Prompts */}
      <div>
        <h2 className="section-title mb-5">Related Prompts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onClick={() => {
                setSelectedPrompt(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
