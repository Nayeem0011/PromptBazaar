import { useState } from "react";
import { PROMPTS } from "../data/mockData";

const myUploads = PROMPTS.filter((p) => p.seller === "ArtsyAI");

const MONTHLY = [
  { month: "Jan", amount: 420 },
  { month: "Feb", amount: 630 },
  { month: "Mar", amount: 880 },
  { month: "Apr", amount: 740 },
  { month: "May", amount: 960 },
];
const MAX_AMT = Math.max(...MONTHLY.map((m) => m.amount));

const WITHDRAWAL_METHODS = ["bKash", "Nagad", "Dutch-Bangla Rocket", "DBBL Bank Transfer", "IBBL Bank Transfer", "Other Bank"];

export default function SellerDashboard({ user }) {
  const [tab, setTab] = useState("uploads");
  const [showUploadForm, setShowUploadForm] = useState(false);

  const tabs = ["uploads", "earnings", "withdraw"];

  return (
    <div className="px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="page-title mb-1">Seller Dashboard</h1>
          <p className="text-text-secondary text-sm">Welcome back, {user?.name || "Seller"} 👋</p>
        </div>
        <button className="btn-primary" onClick={() => setShowUploadForm(!showUploadForm)}>
          {showUploadForm ? "✕ Cancel" : "+ Upload New Prompt"}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="card p-6 mb-8 max-w-xl">
          <h3 className="font-semibold text-base mb-5">Upload New Prompt</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">Prompt Title</label>
              <input placeholder="e.g. Misty Mountain at Sunrise" />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">Category</label>
              <select>
                {["Nature", "Portrait", "Real Estate", "Urban", "Abstract", "Architecture"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">The Prompt</label>
              <textarea rows={4} placeholder="Write your full AI prompt here..." className="resize-none" />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">Preview Image</label>
              <div className="border border-dashed border-surface-border2 rounded-xl p-8 text-center text-text-secondary text-sm cursor-pointer hover:border-brand-500 transition-colors">
                📁 Click to upload or drag and drop<br />
                <span className="text-xs mt-1 block">PNG, JPG up to 5MB</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="btn-primary flex-1 !py-3">Submit for Review</button>
              <button className="btn-ghost" onClick={() => setShowUploadForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          ["৳ 3,720", "Total Earnings", "text-green-400"],
          ["124", "Total Uploads", "text-brand-200"],
          ["2,840", "Total Downloads", "text-amber-400"],
          ["৳ 1,200", "Withdrawable", "text-green-400"],
        ].map(([val, label, color]) => (
          <div key={label} className="stat-card">
            <div className="text-xs text-text-secondary mb-2">{label}</div>
            <div className={`font-syne text-2xl font-bold ${color}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`tab-btn capitalize ${tab === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Uploads Tab ── */}
      {tab === "uploads" && (
        <div className="card overflow-hidden">
          <div className="table-header grid-cols-[2fr_1fr_1fr_1fr_100px]">
            <span>Prompt</span><span>Category</span><span>Downloads</span><span>Revenue</span><span>Status</span>
          </div>
          {myUploads.map((p) => (
            <div key={p.id} className="table-row grid-cols-[2fr_1fr_1fr_1fr_100px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1a103a] to-[#2d1260] flex items-center justify-center text-lg shrink-0">
                  {p.preview}
                </div>
                <span className="font-medium text-sm line-clamp-1">{p.title}</span>
              </div>
              <span className="badge badge-purple self-center">{p.category}</span>
              <span className="text-sm self-center">{p.downloads}</span>
              <span className="text-sm text-green-400 self-center font-medium">৳ {p.downloads}</span>
              <span className={`badge self-center ${p.approved ? "badge-green" : "badge-amber"}`}>
                {p.approved ? "Live" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Earnings Tab ── */}
      {tab === "earnings" && (
        <div className="card p-6 max-w-lg">
          <h3 className="font-semibold mb-6">Monthly Earnings</h3>
          <div className="space-y-4">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-8">{m.month}</span>
                <div className="flex-1 h-2 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-700"
                    style={{ width: `${(m.amount / MAX_AMT) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-brand-200 font-semibold w-16 text-right">৳ {m.amount}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-surface-border mt-6 pt-4 flex justify-between items-center">
            <span className="text-text-secondary text-sm">Total (2025)</span>
            <span className="font-syne text-xl font-bold text-green-400">৳ 3,630</span>
          </div>
        </div>
      )}

      {/* ── Withdraw Tab ── */}
      {tab === "withdraw" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-1">Request Withdrawal</h3>
            <p className="text-text-secondary text-xs mb-5">
              Available balance: <strong className="text-green-400">৳ 1,200</strong>
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-text-secondary mb-1.5 block">Payment Method</label>
                <select>
                  {WITHDRAWAL_METHODS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-text-secondary mb-1.5 block">Account Number / Phone</label>
                <input placeholder="e.g. 01700000000" />
              </div>
              <div>
                <label className="text-xs text-text-secondary mb-1.5 block">Amount (min ৳100)</label>
                <input type="number" placeholder="Enter amount" min={100} max={1200} />
              </div>
              <button className="btn-primary !py-3">Submit Withdrawal Request</button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-4">Withdrawal History</h3>
            <div className="space-y-3">
              {[
                { amt: "৳ 800", method: "bKash", status: "Completed", date: "3 days ago" },
                { amt: "৳ 500", method: "Bank", status: "Completed", date: "1 week ago" },
                { amt: "৳ 300", method: "Nagad", status: "Pending", date: "Just now" },
              ].map((w) => (
                <div key={w.date} className="flex items-center justify-between py-3 border-b border-surface-border last:border-0">
                  <div>
                    <div className="font-semibold text-sm">{w.amt}</div>
                    <div className="text-xs text-text-secondary mt-0.5">{w.method} · {w.date}</div>
                  </div>
                  <span className={`badge ${w.status === "Completed" ? "badge-green" : "badge-amber"}`}>
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
