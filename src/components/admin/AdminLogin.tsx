import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const AdminLogin: React.FC<{ onBackToSite: () => void }> = ({ onBackToSite }) => {
  const { loginWithGoogle, loginWithEmail, loginAsDemo, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsBusy(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google sign-in failed.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setErrorMsg(null);
    setIsBusy(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        'Email authentication failed. Tip: Use Google Sign-In with baithon1122@gmail.com, or click Quick Access Demo below.'
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071e20] flex items-center justify-center p-4 relative overflow-hidden bg-silk-pattern">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2EC4B6]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0B2B2E] border border-[#F2A93B]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2B2E] via-[#164246] to-[#2EC4B6] border border-[#F2A93B]/50 flex items-center justify-center shadow-lg mx-auto mb-4">
            <Compass className="w-7 h-7 text-[#F2A93B]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
            Ummon Hostel Admin
          </h2>
          <p className="text-xs text-slate-300">
            Secure Management Dashboard · Tashkent, Uzbekistan
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Google One-Click Login */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isBusy}
            className="w-full py-3 px-4 rounded-xl bg-white text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Or Email Login</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#F2A93B] block">Default Admin Login:</span>
              <span className="font-mono text-white text-[11px]">admin@ummonhostel.uz</span>
              <span className="text-slate-400 block text-[10px]">Password: <strong className="text-white font-mono">admin123</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@ummonhostel.uz');
                setPassword('admin123');
              }}
              className="text-[11px] font-semibold text-[#2EC4B6] hover:underline px-2 py-1 bg-white/5 rounded-lg border border-white/10"
            >
              Autofill
            </button>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ummonhostel.uz"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In</span>}
            </button>
          </form>
        </div>

        {/* Instant Quick-Access Demo mode for immediate testing */}
        <div className="pt-5 border-t border-white/10">
          <p className="text-[11px] text-slate-400 text-center mb-3">
            Instant Test Access (No setup required):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => loginAsDemo('owner')}
              className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span>Owner Access</span>
            </button>
            <button
              onClick={() => loginAsDemo('staff')}
              className="p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#2EC4B6]" />
              <span>Staff Access</span>
            </button>
          </div>
        </div>

        {/* Back to public site */}
        <div className="mt-6 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Ummon Hostel Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
