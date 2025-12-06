"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Onjuist wachtwoord");
      }
    } catch {
      setError("Er is een fout opgetreden");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-main-light rounded-card shadow-card p-8">
          <h1 className="font-display text-2xl text-text-primary text-center mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block font-body text-sm text-text-primary mb-2"
              >
                Wachtwoord
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-transparent"
                placeholder="Voer wachtwoord in"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Laden..." : "Inloggen"}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-text-on-dark/60 font-body text-sm">
          <a href="/" className="hover:text-text-on-dark">
            &larr; Terug naar website
          </a>
        </p>
      </div>
    </div>
  );
}
