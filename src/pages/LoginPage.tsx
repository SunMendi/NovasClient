import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NovasLogo } from "../components/common/NovasLogo";
import { Button } from "../components/ui/button";
import { authService, AuthUser } from "../services/auth";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Database,
  Cloud,
  Layers,
  Sparkles,
  Server
} from "lucide-react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await authService.login(username, password);
      setCurrentUser(user);
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f9f8fb] via-white to-[#f4f3f8]">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <NovasLogo variant="navy" height={44} showSubtitle={true} />
          </Link>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#133057]/5 border border-[#133057]/10 text-xs font-semibold tracking-wide text-[#133057]">
            <ShieldCheck className="size-3.5 text-[#ed145b]" />
            <span>Sovereign Security Gateway</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-[#133057] sm:text-3xl font-display">
            {currentUser ? "Administrative Workspace" : "Admin Sign In"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {currentUser
              ? "Manage mission systems, upload Cloudinary media, and control catalog data."
              : "Enter your official credentials to access the Novas platform management."}
          </p>
        </div>

        {/* State A: Logged In Dashboard */}
        {currentUser ? (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-slate-200/50 space-y-6">
            {/* User Profile Pill */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="size-12 rounded-full bg-gradient-to-br from-[#133057] to-[#1e4880] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#133057] truncate">{currentUser.username}</span>
                  {currentUser.is_superuser && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#ed145b] text-white">
                      Superuser
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">{currentUser.email || "Primary Administrator"}</p>
              </div>
            </div>

            {/* Quick Management Links */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Control Hub
              </p>

              {/* Django Admin Backstage with Cloudinary */}
              <a
                href="https://novas-backend-production.up.railway.app/admin/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#133057]/30 hover:bg-slate-50/80 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#133057]/5 text-[#133057] flex items-center justify-center group-hover:bg-[#133057] group-hover:text-white transition-colors">
                    <Cloud className="size-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#133057] block">
                      Cloudinary Media & CMS
                    </span>
                    <span className="text-xs text-slate-500">
                      Upload photos, manage vessels & product catalog
                    </span>
                  </div>
                </div>
                <ExternalLink className="size-4 text-slate-400 group-hover:text-[#ed145b] transition-colors" />
              </a>

              {/* Database Status */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/50">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Database className="size-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-emerald-950 block">
                      Production PostgreSQL
                    </span>
                    <span className="text-xs text-emerald-700">
                      Connected & synchronized in Railway Cloud
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="size-5 text-emerald-600" />
              </div>

              {/* Public Catalog Link */}
              <Link
                to="/products/all"
                className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#133057]/30 hover:bg-slate-50/80 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#133057]/5 text-[#133057] flex items-center justify-center group-hover:bg-[#133057] group-hover:text-white transition-colors">
                    <Layers className="size-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#133057] block">
                      View Live Website Catalog
                    </span>
                    <span className="text-xs text-slate-500">
                      See customer-facing equipment & project specs
                    </span>
                  </div>
                </div>
                <ArrowRight className="size-4 text-slate-400 group-hover:text-[#ed145b] transition-colors" />
              </Link>
            </div>

            {/* Logout Action */}
            <div className="pt-2 border-t border-slate-200">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full gap-2 border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors h-10 font-bold"
              >
                <LogOut className="size-4" />
                <span>Sign Out of Admin Portal</span>
              </Button>
            </div>
          </div>
        ) : (
          /* State B: Login Form */
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/50">
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200/80 p-3.5 text-sm text-rose-700">
                <AlertCircle className="size-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication Failed</p>
                  <p className="text-xs mt-0.5 text-rose-600">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username / Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#133057] mb-1.5">
                  Admin Identifier / Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="size-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin@novasbd.com"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-[#133057] placeholder:text-slate-400 focus:border-[#ed145b] focus:outline-none focus:ring-2 focus:ring-[#ed145b]/20 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#133057]">
                    Security Password
                  </label>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="size-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-11 py-2.5 text-sm text-[#133057] placeholder:text-slate-400 focus:border-[#ed145b] focus:outline-none focus:ring-2 focus:ring-[#ed145b]/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-[#133057] transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2 bg-[#133057] hover:bg-[#0e2442] text-white font-bold h-11 rounded-xl shadow-md shadow-[#133057]/20 transition-all mt-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Novas Admin</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Secured by Novas Sovereign Infrastructure · Encrypted Token Authentication
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
