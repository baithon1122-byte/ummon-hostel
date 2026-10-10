import React, { useState } from 'react';
import { HostelSettings } from '../../types';
import { testConnection } from '../../firebase/firebase';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Server,
  Sparkles,
  RefreshCw,
  Sliders
} from 'lucide-react';

interface AdminSettingsProps {
  settings: HostelSettings;
  onSaveSettings: (settings: Partial<HostelSettings>) => Promise<void>;
  onSeedData: () => Promise<void>;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onSaveSettings,
  onSeedData,
}) => {
  const [testingConn, setTestingConn] = useState(false);
  const [connResult, setConnResult] = useState<string | null>(null);
  const [seedingBusy, setSeedingBusy] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setTestingConn(true);
    setConnResult(null);
    try {
      await testConnection();
      setConnResult('Connection to Google Cloud Firestore verified active & responsive!');
    } catch (err: any) {
      setConnResult(`Connection error: ${err.message}`);
    } finally {
      setTestingConn(false);
    }
  };

  const handleSeed = async () => {
    setSeedingBusy(true);
    setSeedStatus(null);
    try {
      await onSeedData();
      setSeedStatus('Demo rooms, bookings, reviews, gallery & settings successfully populated!');
    } catch (err: any) {
      setSeedStatus(`Seed error: ${err.message}`);
    } finally {
      setSeedingBusy(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-white">
          Hostel System Settings & Cloud Diagnostics
        </h2>
        <p className="text-xs text-slate-400">
          Backend database status, seed controls, and system parameters.
        </p>
      </div>

      {/* Database Diagnostic & Seed Box */}
      <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-[#F2A93B]/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/20 text-[#F2A93B] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Google Cloud Firestore Integration
              </h3>
              <p className="text-xs text-slate-400">
                Connected Project: gen-lang-client-0962231430
              </p>
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={testingConn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {testingConn ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-[#2EC4B6]" />}
            <span>Test Connection</span>
          </button>
        </div>

        {connResult && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{connResult}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-white text-sm">
              Instant Seed Demo Data
            </h4>
            <p className="text-xs text-slate-400 max-w-md">
              Populates 4 boutique rooms, sample bookings across statuses, verified reviews, expenses, and photos in your database.
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={seedingBusy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-md transition-all disabled:opacity-50 shrink-0"
          >
            {seedingBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            <span>Populate / Reset Demo Data</span>
          </button>
        </div>

        {seedStatus && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{seedStatus}</span>
          </div>
        )}
      </div>

      {/* Property Information */}
      <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif font-bold text-base text-white border-b border-white/10 pb-3">
          Hostel Credentials & Official Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-[#071e20] border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Hostel Name</span>
            <span className="font-semibold text-white">{settings.name}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071e20] border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Address</span>
            <span className="font-semibold text-white">{settings.address}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071e20] border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Direct Phone</span>
            <span className="font-semibold text-white">{settings.phone}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#071e20] border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Official Registration</span>
            <span className="font-semibold text-emerald-400">e-Mehmon Uzbekistan Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
