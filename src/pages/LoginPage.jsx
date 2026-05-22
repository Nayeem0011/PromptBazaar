import { useState } from "react";

export default function LoginPage({ setPage, setUser }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const u = {
      name: name || (role === "admin" ? "Admin User" : mode === "login" ? "Demo User" : name || "New User"),
      email: email || "demo@promptbazaar.com",
      role,
    };
    setUser(u);
    if (role === "admin") setPage("admin");
    else if (role === "seller") setPage("seller");
    else setPage("buyer");
  };

  const handleGoogle = () => {
    setUser({ name: "Google User", email: "google@example.com", role: "buyer" });
    setPage("buyer");
  };

  const ROLES = [
    { key: "buyer", label: "🛍 Buyer", desc: "Download prompts" },
    { key: "seller", label: "💰 Seller", desc: "Sell prompts" },
    { key: "admin", label: "🛡 Admin", desc: "Manage platform" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="font-syne text-3xl font-bold mb-2">
            {mode === "login" ? "Welcome Back" : "Join PromptBazaar"}
          </h1>
          <p className="text-text-secondary text-sm">
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Create your free account today"}
          </p>
        </div>

        <div className="card p-7">
          {/* Role Selector (Register only) */}
          {mode === "register" && (
            <div className="mb-6">
              <p className="text-xs text-text-secondary mb-3 font-semibold uppercase tracking-wider">I want to</p>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-200 ${
                      role === r.key
                        ? "border-brand-500 bg-surface-border"
                        : "border-surface-border2 bg-transparent hover:border-brand-500/40"
                    }`}
                  >
                    <div className="text-lg mb-1">{r.label.split(" ")[0]}</div>
                    <div className={`text-xs font-medium ${role === r.key ? "text-brand-200" : "text-text-secondary"}`}>
                      {r.label.split(" ")[1]}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {mode === "register" && (
              <div>
                <label className="text-xs text-text-secondary mb-1.5 block">Full Name</label>
                <input
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {mode === "login" && (
              <div className="text-right -mt-2">
                <span className="text-xs text-brand-400 cursor-pointer hover:text-brand-300">Forgot password?</span>
              </div>
            )}

            <button className="btn-primary !py-3.5 !text-base" onClick={handleSubmit}>
              {mode === "login" ? "Sign In →" : "Create Account →"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-xs text-text-muted">or continue with</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Google */}
          <button
            className="btn-ghost w-full !py-2.5 flex items-center justify-center gap-2.5"
            onClick={handleGoogle}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-5 text-sm text-text-secondary">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            className="text-brand-400 hover:text-brand-300 transition-colors bg-transparent border-0 cursor-pointer text-sm"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
