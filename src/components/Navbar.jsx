import { useState } from "react";

export default function Navbar({ page, setPage, user, setUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: "home", label: "Home" },
    { key: "browse", label: "Browse" },
    { key: "sell", label: "Sell" },
    { key: "admin", label: "Admin" },
  ];

  const dashboardPage = user?.role === "seller" ? "seller" : "buyer";

  return (
    <nav className="sticky top-0 z-50 bg-[#07070f] border-b border-surface-border px-6 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center justify-between gap-6 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="font-syne text-xl font-extrabold bg-gradient-to-r from-brand-200 to-brand-400 bg-clip-text text-transparent border-0 bg-transparent cursor-pointer"
        >
          PromptBazaar
        </button>

        {/* Center Nav */}
        <div className="hidden md:flex gap-1">
          {navLinks.map((l) => (
            <button
              key={l.key}
              onClick={() => setPage(l.key)}
              className={`tab-btn ${page === l.key ? "active" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                className="tab-btn hidden md:block text-brand-200"
                onClick={() => setPage(dashboardPage)}
              >
                {user.role === "seller" ? "Dashboard" : "My Downloads"}
              </button>
              {user.role === "admin" && (
                <button
                  className="tab-btn text-amber-400"
                  onClick={() => setPage("admin")}
                >
                  Admin
                </button>
              )}
              <button
                onClick={() => setUser(null)}
                title="Sign out"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-sm font-bold text-white border-0 cursor-pointer hover:opacity-80 transition-opacity"
              >
                {user.name[0].toUpperCase()}
              </button>
            </>
          ) : (
            <button
              className="btn-primary !py-2 !px-4 !text-sm"
              onClick={() => setPage("login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
