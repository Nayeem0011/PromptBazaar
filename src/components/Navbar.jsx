import { useState } from 'react'
import { Menu, X } from "lucide-react";

const Navbar = ({ page, setPage, user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { key: "home", label: "Home" },
    { key: "browse", label: "Browse" },
    { key: "sell", label: "Sell" },
    { key: "admin", label: "Admin" },
  ];

  const dashboardPage = user?.role === "seller" ? "seller" : "buyer";

  return (
    <div>
      <nav className="sticky top-0 bg-[#07070f] border-b border-surface-border px-6 md:px-8 h-16 flex items-center justify-between">
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
            {/* Desktop User Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <button
                    className="tab-btn text-brand-200"
                    onClick={() => setPage(dashboardPage)}
                  >
                    {user.role === "seller"
                      ? "Dashboard"
                      : "My Downloads"}
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
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-all duration-300 md:hidden
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-screen w-[80%] bg-[#07070f] border-l border-surface-border px-4 py-6 space-y-2 z-30 transform transition-transform duration-300 md:hidden 
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={28} />
          </button>
        </div>
        {navLinks.map((l) => (
          <button
            key={l.key}
            onClick={() => {
              setPage(l.key);
              setMenuOpen(false);
            }}
            className={`tab-btn w-full text-left ${page === l.key ? "active" : ""
              }`}
          >
            {l.label}
          </button>
        ))}
        {user ? (
          <>
            <button
              className="tab-btn w-full text-left text-brand-200"
              onClick={() => {
                setPage(dashboardPage);
                setMenuOpen(false);
              }}
            >
              {user.role === "seller"
                ? "Dashboard"
                : "My Downloads"}
            </button>
            {user.role === "admin" && (
              <button
                className="tab-btn w-full text-left text-amber-400"
                onClick={() => {
                  setPage("admin");
                  setMenuOpen(false);
                }}
              >
                Admin
              </button>
            )}
            <button
              onClick={() => {
                setUser(null);
                setMenuOpen(false);
              }}
              className="btn-primary w-full"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button className="btn-primary w-full"
            onClick={() => {
              setPage("login");
              setMenuOpen(false);
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
