import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import PromptPage from "./pages/PromptPage";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />

      <main>
        {page === "home" && (
          <HomePage setPage={setPage} setSelectedPrompt={setSelectedPrompt} />
        )}
        {page === "browse" && (
          <BrowsePage setPage={setPage} setSelectedPrompt={setSelectedPrompt} />
        )}
        {page === "prompt" && (
          <PromptPage
            prompt={selectedPrompt}
            setPage={setPage}
            user={user}
            setSelectedPrompt={setSelectedPrompt}
          />
        )}
        {page === "seller" && <SellerDashboard user={user} />}
        {page === "buyer" && (
          <BuyerDashboard user={user} setPage={setPage} setSelectedPrompt={setSelectedPrompt} />
        )}
        {page === "login" && <LoginPage setPage={setPage} setUser={setUser} />}
        {page === "admin" && <AdminPanel />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-surface-border mt-10">
        <p className="font-geist justify-normal text-xs text-text-muted">
          © 2025 PromptBazaar · AI Prompt Marketplace · Made in Bangladesh 🇧🇩
        </p>
      </footer>
    </div>
  );
}
