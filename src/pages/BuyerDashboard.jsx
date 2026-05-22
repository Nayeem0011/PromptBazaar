import { useState } from "react";
import { PROMPTS } from "../data/mockData";

const downloadedPrompts = PROMPTS.filter((p) => p.approved).slice(0, 4);

const PAYMENTS = [
  { id: "#TXN-9821", amount: "৳ 1", method: "bKash", date: "May 20", status: "Success" },
  { id: "#TXN-9740", amount: "৳ 1", method: "bKash", date: "May 18", status: "Success" },
  { id: "#TXN-9605", amount: "৳ 1", method: "Card", date: "May 15", status: "Success" },
  { id: "#TXN-9510", amount: "৳ 1", method: "Card", date: "May 10", status: "Success" },
];

const DOWNLOAD_DATES = ["May 20", "May 18", "May 15", "May 10"];

export default function BuyerDashboard({ user, setPage, setSelectedPrompt }) {
  const [tab, setTab] = useState("downloads");

  return (
    <div className="px-6 md:px-10 py-8">
      <h1 className="page-title mb-1">My Dashboard</h1>
      <p className="text-text-secondary text-sm mb-8">Welcome, {user?.name || "Buyer"} 👋</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          ["12", "Prompts Downloaded", "text-brand-200"],
          ["৳ 12", "Total Spent", "text-amber-400"],
          ["2", "Favourites", "text-green-400"],
        ].map(([val, label, color]) => (
          <div key={label} className="stat-card">
            <div className="text-xs text-text-secondary mb-2">{label}</div>
            <div className={`font-syne text-3xl font-bold ${color}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {["downloads", "payments"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`tab-btn capitalize ${tab === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Downloads Tab ── */}
      {tab === "downloads" && (
        <div className="card overflow-hidden">
          <div className="table-header grid-cols-[2fr_1fr_1fr_120px]">
            <span>Prompt</span><span>Category</span><span>Downloaded</span><span>Action</span>
          </div>
          {downloadedPrompts.map((p, i) => (
            <div key={p.id} className="table-row grid-cols-[2fr_1fr_1fr_120px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1a103a] to-[#2d1260] flex items-center justify-center text-lg shrink-0">
                  {p.preview}
                </div>
                <button
                  className="font-medium text-sm text-left hover:text-brand-300 transition-colors bg-transparent border-0 cursor-pointer text-text-primary"
                  onClick={() => { setSelectedPrompt(p); setPage("prompt"); }}
                >
                  {p.title}
                </button>
              </div>
              <span className="badge badge-purple self-center">{p.category}</span>
              <span className="text-xs text-text-secondary self-center">{DOWNLOAD_DATES[i]}</span>
              <button className="btn-ghost !text-xs !py-1.5 !px-3 self-center">↓ Re-download</button>
            </div>
          ))}
        </div>
      )}

      {/* ── Payments Tab ── */}
      {tab === "payments" && (
        <div className="card overflow-hidden">
          <div className="table-header grid-cols-4">
            <span>Transaction ID</span><span>Amount</span><span>Method</span><span>Date</span>
          </div>
          {PAYMENTS.map((p) => (
            <div key={p.id} className="table-row grid-cols-4">
              <span className="font-mono text-xs text-text-secondary">{p.id}</span>
              <span className="font-semibold text-green-400 text-sm">{p.amount}</span>
              <span className="badge badge-purple self-center">{p.method}</span>
              <span className="text-xs text-text-secondary">{p.date}</span>
            </div>
          ))}
          <div className="px-4 py-3 flex justify-between items-center border-t border-surface-border">
            <span className="text-sm text-text-secondary">Total spent</span>
            <span className="font-syne font-bold text-brand-200">৳ {PAYMENTS.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
