import { useMemo, useState } from "react";
import { Users, Wallet, BarChart3, ShieldCheck, CheckCircle2, XCircle, LayoutGrid, TrendingUp, Download, Sparkles, } from "lucide-react";
import { PROMPTS, USERS, WITHDRAWALS, MONTHLY_REVENUE, } from "../data/mockData";

const AdminPanel = () => {

  const [tab, setTab] = useState("overview");
  const [prompts, setPrompts] = useState(PROMPTS);
  const [withdrawals, setWithdrawals] = useState(WITHDRAWALS);

  const pendingPrompts = useMemo(
    () => prompts.filter((p) => !p.approved),
    [prompts]
  );

  const approvedPrompts = useMemo(
    () => prompts.filter((p) => p.approved),
    [prompts]
  );

  const pendingWithdrawals = useMemo(
    () => withdrawals.filter((w) => w.status === "pending"),
    [withdrawals]
  );

  const MAX_REV = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

  const approvePrompt = (id) => {
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, approved: true } : p
      )
    );
  };

  const rejectPrompt = (id) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const payWithdrawal = (id) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: "completed" }
          : w
      )
    );
  };

  const rejectWithdrawal = (id) => {
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: "rejected" }
          : w
      )
    );
  };

  const TABS = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutGrid,
    },
    {
      id: "prompts",
      label: "Prompts",
      icon: Sparkles,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: TrendingUp,
    },
    {
      id: "withdrawals",
      label: "Withdrawals",
      icon: Wallet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07070f] text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#14142b] via-[#0f0f1e] to-[#090912] p-8 mb-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-violet-300" />
                </div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-black font-syne">
                    Admin Dashboard
                  </h1>

                  <p className="text-sm text-zinc-400 mt-1">
                    Manage prompts, users, revenue & withdrawals
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all font-semibold text-sm">
                Generate Report
              </button>

              <button className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            {
              title: "Live Prompts",
              value: approvedPrompts.length,
              icon: Sparkles,
              color:
                "from-violet-600/20 to-fuchsia-500/10 text-violet-300",
            },
            {
              title: "Total Users",
              value: USERS.length,
              icon: Users,
              color:
                "from-cyan-500/20 to-blue-500/10 text-cyan-300",
            },
            {
              title: "Revenue",
              value: "৳ 52,400",
              icon: Wallet,
              color:
                "from-emerald-500/20 to-green-500/10 text-emerald-300",
            },
            {
              title: "Pending Review",
              value: pendingPrompts.length,
              icon: BarChart3,
              color:
                "from-amber-500/20 to-orange-500/10 text-amber-300",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} p-5 backdrop-blur-xl`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-sm text-zinc-400">
                  {item.title}
                </div>

                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-3xl font-black font-syne">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {TABS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 text-sm font-medium
                  
                  ${tab === item.id
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300"
                  }
                `}
              >
                <Icon className="w-4 h-4" />

                {item.label}

                {item.id === "prompts" &&
                  pendingPrompts.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
                      {pendingPrompts.length}
                    </span>
                  )}

                {item.id === "withdrawals" &&
                  pendingWithdrawals.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-xs">
                      {pendingWithdrawals.length}
                    </span>
                  )}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">
                    Revenue Analytics
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Monthly platform performance
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                  +24.5%
                </div>
              </div>

              <div className="space-y-5">
                {MONTHLY_REVENUE.map((m) => (
                  <div
                    key={m.month}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 text-sm text-zinc-400">
                      {m.month}
                    </div>

                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                        style={{
                          width: `${(m.revenue / MAX_REV) * 100
                            }%`,
                        }}
                      />
                    </div>

                    <div className="w-24 text-right text-sm font-semibold text-emerald-400">
                      ৳ {m.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-bold mb-6">
                Quick Insights
              </h3>

              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-sm text-zinc-400 mb-1">
                    Platform Cut
                  </div>

                  <div className="text-2xl font-black text-violet-300">
                    ৳ 10,480
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-sm text-zinc-400 mb-1">
                    Seller Payout
                  </div>

                  <div className="text-2xl font-black text-emerald-300">
                    ৳ 41,920
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-sm text-zinc-400 mb-1">
                    Total Downloads
                  </div>

                  <div className="text-2xl font-black text-cyan-300">
                    18.2K
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMPTS */}
        {tab === "prompts" && (
          <div className="space-y-8">
            {/* Pending */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold">
                  Pending Approval
                </h3>
              </div>

              <div className="divide-y divide-white/5">
                {pendingPrompts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-white/[0.03] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-xl">
                        {p.preview}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">
                          {p.title}
                        </h4>

                        <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                          <span>{p.seller}</span>

                          <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => approvePrompt(p.id)}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>

                      <button
                        onClick={() => rejectPrompt(p.id)}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approved */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold">
                  Live Prompts
                </h3>
              </div>

              <div className="divide-y divide-white/5">
                {approvedPrompts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b1038] to-[#381d78] flex items-center justify-center text-xl">
                        {p.preview}
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          {p.title}
                        </h4>

                        <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                          <span>{p.seller}</span>

                          <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Download className="w-4 h-4" />
                        {p.downloads.toLocaleString()}
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                        Live
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {USERS.map((u) => (
              <div
                key={u.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-black">
                    {u.name[0]}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {u.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {u.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border
                      
                      ${u.role === "admin"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : u.role === "seller"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-violet-500/10 border-violet-500/20 text-violet-300"
                      }
                    `}
                  >
                    {u.role}
                  </span>

                  <span className="text-sm text-zinc-500">
                    {u.joined}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-5">
                  <div className="text-sm text-zinc-400 mb-1">
                    Activity
                  </div>

                  <div className="font-semibold">
                    {u.role === "seller"
                      ? `${u.uploads} uploads`
                      : u.role === "buyer"
                        ? `${u.downloads} downloads`
                        : "Platform Administrator"}
                  </div>
                </div>

                <button className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium">
                  Manage User
                </button>
              </div>
            ))}
          </div>
        )}

        {/* REVENUE */}
        {tab === "revenue" && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">
                  Revenue Analytics
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  Platform earnings overview
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                +18% Growth
              </div>
            </div>

            <div className="space-y-6">
              {MONTHLY_REVENUE.map((m) => (
                <div key={m.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">
                      {m.month}
                    </span>

                    <span className="text-sm font-semibold text-emerald-400">
                      ৳ {m.revenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                      style={{
                        width: `${(m.revenue / MAX_REV) * 100
                          }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WITHDRAWALS */}
        {tab === "withdrawals" && (
          <div className="space-y-5">
            {withdrawals.map((w) => (
              <div
                key={w.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-black text-black">
                    {w.seller[0]}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {w.seller}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-zinc-400">
                      <span>{w.method}</span>

                      <span>{w.account}</span>

                      <span>{w.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-2xl font-black text-emerald-400">
                    ৳ {w.amount.toLocaleString()}
                  </div>

                  {w.status === "pending" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => payWithdrawal(w.id)}
                        className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all"
                      >
                        Pay
                      </button>

                      <button
                        onClick={() =>
                          rejectWithdrawal(w.id)
                        }
                        className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-4 py-2 rounded-2xl text-sm font-semibold border
                        
                        ${w.status === "completed"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                        }
                      `}
                    >
                      {w.status === "completed"
                        ? "Paid"
                        : "Rejected"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
