import React from 'react'
import { PROMPTS } from "../data/mockData";
import PromptCard from "../components/PromptCard";

const STEPS = [
  { step: "01", icon: "🔍", title: "Browse & Find", desc: "Explore thousands of curated AI prompts across categories like Nature, Portrait, Real Estate & more." },
  { step: "02", icon: "💳", title: "Buy for ৳1", desc: "Pay securely via bKash, Dutch-Bangla, or card. Instant access after payment." },
  { step: "03", icon: "✨", title: "Create & Wow", desc: "Paste into Midjourney, DALL-E 3, or Stable Diffusion and generate stunning images instantly." },
];

const STATS = [
  ["5,200+", "Prompts"],
  ["1,800+", "Sellers"],
  ["42,000+", "Downloads"],
  ["৳1 only", "Per Prompt"],
];

const HomePage = ({ setPage, setSelectedPrompt }) => {
  const topPrompts = PROMPTS.filter((p) => p.approved).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Hero */}
      <section className="relative text-center px-6 md:px-10 pt-20 pb-16 overflow-hidden">
        {/* glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <span className="badge badge-purple mb-6 inline-block">
          🚀 1000+ AI Prompts Available
        </span>

        <h1 className="font-clash text-4xl md:text-6xl font-bold leading-tight mb-8">
          Download AI Prompts,<br />Create Stunning Images
        </h1>

        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Buy and sell premium AI image prompts. One-click download, instant results — made for Bangladeshi creators.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button className="btn-primary !px-8 !py-3.5 !text-base" onClick={() => setPage("browse")}>
            Browse Prompts
          </button>
          <button className="btn-ghost !px-8 !py-3.5 !text-base" onClick={() => setPage("login")}>
            Start Selling →
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-10 justify-center mt-14 flex-wrap">
          {STATS.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-syne text-2xl font-bold text-brand-200">{val}</div>
              <div className="text-xs text-text-secondary mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 md:px-10 py-16">
        <h2 className="section-title text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {STEPS.map((s) => (
            <div key={s.step} className="card p-6 text-center">
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="text-brand-400 text-xs font-bold mb-2 tracking-widest">STEP {s.step}</div>
              <div className="font-semibold text-base mb-2">{s.title}</div>
              <div className="text-text-secondary text-sm leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="px-6 md:px-10 py-4 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">🔥 Top Sellers</h2>
          <button className="btn-ghost" onClick={() => setPage("browse")}>View All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPrompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onClick={() => { setSelectedPrompt(p); setPage("prompt"); }}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 md:mx-10 mb-16 rounded-2xl bg-gradient-to-br from-[#1a0f3a] to-[#2d1260] border border-surface-border p-12 text-center">
        <h2 className="font-syne text-3xl font-bold mb-4">Ready to Start Creating?</h2>
        <p className="text-text-secondary mb-8 text-base">
          Join 1,800+ sellers already earning from their AI prompt expertise in Bangladesh.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="btn-primary !px-7 !py-3" onClick={() => setPage("browse")}>Browse Prompts</button>
          <button className="btn-ghost !px-7 !py-3" onClick={() => setPage("login")}>Become a Seller</button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
