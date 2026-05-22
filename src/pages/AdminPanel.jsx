import { useState } from "react";
import { PROMPTS, USERS, WITHDRAWALS, MONTHLY_REVENUE } from "../data/mockData";

const MAX_REV = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

export default function AdminPanel() {
  const [tab, setTab] = useState("prompts");
  const [prompts, setPrompts] = useState(PROMPTS);
  const [withdrawals, setWithdrawals] = useState(WITHDRAWALS);

  const pending = prompts.filter((p) => !p.approved);
  const approved = prompts.filter((p) => p.approved);

  const approvePrompt = (id) => setPrompts((prev) => prev.map((p) => p.id === id ? { ...p, approved: true } : p));
  const rejectPrompt = (id) => setPrompts((prev) => prev.filter((p) => p.id !== id));
  const payWithdrawal = (id) => setWithdrawals((prev) => prev.map((w) => w.id === id ? { ...w, status: "completed" } : w));
  const rejectWithdrawal = (id) => setWithdrawals((prev) => prev.map((w) => w.id === id ? { ...w, status: "rejected" } : w));

  const TABS = ["prompts", "users", "revenue", "withdrawals"];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="page-title">Admin Panel</h1>
        <span className="badge badge-amber">🛡 Admin</span>
      </div>
      <p className="text-text-secondary text-sm mb-8">Platform overview & management</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          [prompts.filter((p) => p.approved).length.toString(), "Live Prompts", "text-brand-200"],
          [USERS.length.toString(), "Total Users", "text-amber-400"],
          ["৳ 52,400", "Total Revenue", "text-green-400"],
          [pending.length.toString(), "Pending Review", "text-red-400"],
        ].map(([val, label, color]) => (
          <div key={label} className="stat-card">
            <div className="text-xs text-text-secondary mb-2">{label}</div>
            <div className={`font-syne text-2xl font-bold ${color}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`tab-btn capitalize ${tab === t ? "active" : ""}`}
          >
            {t}
            {t === "prompts" && pending.length > 0 && (
              <span className="ml-1.5 badge badge-red !px-1.5 !py-0">{pending.length}</span>
            )}
            {t === "withdrawals" && withdrawals.filter((w) => w.status === "pending").length > 0 && (
              <span className="ml-1.5 badge badge-amber !px-1.5 !py-0">
                {withdrawals.filter((w) => w.status === "pending").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Prompts Tab ── */}
      {tab === "prompts" && (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-400 mb-3">⏳ Pending Approval ({pending.length})</h3>
              <div className="card overflow-hidden">
                <div className="table-header grid-cols-[2fr_1fr_1fr_180px]">
                  <span>Title</span><span>Seller</span><span>Category</span><span>Actions</span>
                </div>
                {pending.map((p) => (
                  <div key={p.id} className="table-row grid-cols-[2fr_1fr_1fr_180px]">
                    <span className="font-medium text-sm">{p.title}</span>
                    <span className="text-sm text-text-secondary">{p.seller}</span>
                    <span className="badge badge-purple self-center">{p.category}</span>
                    <div className="flex gap-2">
                      <button className="btn-success" onClick={() => approvePrompt(p.id)}>✓ Approve</button>
                      <button className="btn-danger" onClick={() => rejectPrompt(p.id)}>✕ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3">All Live Prompts ({approved.length})</h3>
            <div className="card overflow-hidden">
              <div className="table-header grid-cols-[2fr_1fr_1fr_1fr_100px]">
                <span>Title</span><span>Seller</span><span>Category</span><span>Downloads</span><span>Status</span>
              </div>
              {approved.map((p) => (
                <div key={p.id} className="table-row grid-cols-[2fr_1fr_1fr_1fr_100px]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a103a] to-[#2d1260] flex items-center justify-center text-base shrink-0">
                      {p.preview}
                    </div>
                    <span className="font-medium text-sm line-clamp-1">{p.title}</span>
                  </div>
                  <span className="text-sm text-text-secondary">{p.seller}</span>
                  <span className="badge badge-purple self-center">{p.category}</span>
                  <span className="text-sm">{p.downloads.toLocaleString()}</span>
                  <span className="badge badge-green self-center">Live</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Users Tab ── */}
      {tab === "users" && (
        <div className="card overflow-hidden">
          <div className="table-header grid-cols-[2fr_1fr_1fr_1fr_100px]">
            <span>User</span><span>Role</span><span>Joined</span><span>Activity</span><span>Action</span>
          </div>
          {USERS.map((u) => (
            <div key={u.id} className="table-row grid-cols-[2fr_1fr_1fr_1fr_100px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {u.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{u.name}</div>
                  <div className="text-xs text-text-muted">{u.email}</div>
                </div>
              </div>
              <span className={`badge self-center capitalize ${u.role === "seller" ? "badge-amber" : u.role === "admin" ? "badge-green" : "badge-purple"}`}>
                {u.role}
              </span>
              <span className="text-xs text-text-secondary self-center">{u.joined}</span>
              <span className="text-xs text-text-secondary self-center">
                {u.role === "seller" ? `${u.uploads} uploads` : u.role === "buyer" ? `${u.downloads} downloads` : "Platform admin"}
              </span>
              <button className="btn-ghost !text-xs !py-1.5 !px-3 self-center">Manage</button>
            </div>
          ))}
        </div>
      )}

      {/* ── Revenue Tab ── */}
      {tab === "revenue" && (
        <div className="card p-6 max-w-xl">
          <h3 className="font-semibold mb-6">Monthly Revenue (2025)</h3>
          <div className="space-y-4">
            {MONTHLY_REVENUE.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-8">{m.month}</span>
                <div className="flex-1 h-2.5 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
                    style={{ width: `${(m.revenue / MAX_REV) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-green-400 font-semibold w-20 text-right">৳ {m.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-surface-border mt-6 pt-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Platform cut (20%)</span>
              <span className="text-brand-200 font-semibold">৳ 10,480</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Seller payouts (80%)</span>
              <span className="text-green-400 font-semibold">৳ 41,920</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-surface-border">
              <span className="text-text-secondary text-sm">Total Revenue</span>
              <span className="font-syne text-xl font-bold text-brand-200">৳ 52,400</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Withdrawals Tab ── */}
      {tab === "withdrawals" && (
        <div className="card overflow-hidden">
          <div className="table-header grid-cols-[2fr_1fr_1fr_1fr_1fr_160px]">
            <span>Seller</span><span>Amount</span><span>Method</span><span>Account</span><span>Date</span><span>Action</span>
          </div>
          {withdrawals.map((w) => (
            <div key={w.id} className="table-row grid-cols-[2fr_1fr_1fr_1fr_1fr_160px]">
              <span className="font-medium text-sm">{w.seller}</span>
              <span className="text-green-400 font-semibold text-sm">৳ {w.amount.toLocaleString()}</span>
              <span className="badge badge-purple self-center">{w.method}</span>
              <span className="text-xs text-text-secondary font-mono">{w.account}</span>
              <span className="text-xs text-text-secondary">{w.date}</span>
              {w.status === "pending" ? (
                <div className="flex gap-2">
                  <button className="btn-success" onClick={() => payWithdrawal(w.id)}>✓ Pay</button>
                  <button className="btn-danger" onClick={() => rejectWithdrawal(w.id)}>✕</button>
                </div>
              ) : (
                <span className={`badge self-center ${w.status === "completed" ? "badge-green" : "badge-red"}`}>
                  {w.status === "completed" ? "Paid" : "Rejected"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
