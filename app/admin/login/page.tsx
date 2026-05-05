"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setGreska(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setGreska(data.error ?? "Грешка приликом пријаве");
      }
    } catch {
      setGreska("Грешка у вези са сервером");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-crimson-700 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-white font-extrabold text-2xl tracking-tight">
            Администрација
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Средња школа Доситеј
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 p-8 space-y-5">

          {greska && (
            <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-3">
              {greska}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
              Е-пошта
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@skola.rs"
                className="w-full bg-stone-800 border border-stone-700 focus:border-crimson-600 text-white placeholder-stone-600 text-sm pl-10 pr-4 py-3 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Lozinka */}
          <div>
            <label className="block text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
              Лозинка
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-stone-800 border border-stone-700 focus:border-crimson-600 text-white placeholder-stone-600 text-sm pl-10 pr-10 py-3 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-crimson-700 hover:bg-crimson-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 text-sm transition-colors mt-2"
          >
            {loading ? "Пријава у току..." : "Пријави се"}
          </button>
        </form>

        <p className="text-center text-stone-700 text-xs mt-6">
          © {new Date().getFullYear()} СШ Доситеј · Администраторски панел
        </p>
      </div>
    </div>
  );
}