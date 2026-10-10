import React, { useState } from 'react';
import { PaymentTransaction, ExpenseRecord } from '../../types';
import { formatRawUzs } from '../../utils/formatters';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Plus,
  Download,
  Receipt,
  X,
  CreditCard,
  Banknote,
  Trash2
} from 'lucide-react';

interface AdminFinanceProps {
  payments: PaymentTransaction[];
  expenses: ExpenseRecord[];
  onAddPayment: (p: Omit<PaymentTransaction, 'id' | 'createdAt'>) => void;
  onAddExpense: (e: Omit<ExpenseRecord, 'id' | 'createdAt'>) => void;
  onDeleteExpense: (id: string) => void;
  uzsRate?: number;
}

export const AdminFinance: React.FC<AdminFinanceProps> = ({
  payments,
  expenses,
  onAddPayment,
  onAddExpense,
  onDeleteExpense,
  uzsRate = 12800,
}) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'expenses'>('payments');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  // Form states for Payment
  const [pGuestName, setPGuestName] = useState('');
  const [pAmountUsd, setPAmountUsd] = useState(30);
  const [pMethod, setPMethod] = useState<'cash_usd' | 'cash_uzs' | 'card' | 'transfer'>('cash_usd');
  const [pType, setPType] = useState<'income' | 'deposit' | 'refund'>('income');
  const [pNotes, setPNotes] = useState('');

  // Form states for Expense
  const [eTitle, setETitle] = useState('');
  const [eCategory, setECategory] = useState<ExpenseRecord['category']>('utilities');
  const [eAmountUsd, setEAmountUsd] = useState(25);
  const [eNotes, setENotes] = useState('');

  // Calculations
  const totalRevenueUsd = payments.reduce((sum, p) => sum + (p.type === 'refund' ? -p.amountUsd : p.amountUsd), 0);
  const totalExpensesUsd = expenses.reduce((sum, e) => sum + e.amountUsd, 0);
  const netProfitUsd = totalRevenueUsd - totalExpensesUsd;

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPayment({
      guestName: pGuestName || 'Walk-In Guest',
      amountUsd: pAmountUsd,
      amountUzs: Math.round(pAmountUsd * uzsRate),
      method: pMethod,
      type: pType,
      date: new Date().toISOString().split('T')[0],
      notes: pNotes || undefined
    });
    setPaymentModalOpen(false);
    setPGuestName('');
    setPNotes('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      title: eTitle,
      category: eCategory,
      amountUsd: eAmountUsd,
      amountUzs: Math.round(eAmountUsd * uzsRate),
      date: new Date().toISOString().split('T')[0],
      notes: eNotes || undefined
    });
    setExpenseModalOpen(false);
    setETitle('');
    setENotes('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Finance & Profitability
          </h2>
          <p className="text-xs text-slate-400">
            Cash register, card terminals, operational expenses, and net profit ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0B2B2E] bg-[#F2A93B] hover:brightness-110 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>

          <button
            onClick={() => setExpenseModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-all"
          >
            <Receipt className="w-4 h-4 text-rose-400" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
              Total Revenue
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-400">
              ${totalRevenueUsd.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              ≈ {Math.round(totalRevenueUsd * uzsRate).toLocaleString()} UZS
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
              Operational Expenses
            </span>
            <div className="font-serif text-3xl font-bold text-rose-400">
              ${totalExpensesUsd.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {expenses.length} logged expense items
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B2B2E] border border-[#F2A93B]/40 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#F2A93B] block mb-1">
              Net Profit
            </span>
            <div className={`font-serif text-3xl font-bold ${netProfitUsd >= 0 ? 'text-white' : 'text-rose-400'}`}>
              ${netProfitUsd.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Operating margin: {totalRevenueUsd ? Math.round((netProfitUsd / totalRevenueUsd) * 100) : 0}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/20 text-[#F2A93B] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-white/10 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 transition-colors ${
            activeTab === 'payments'
              ? 'text-[#F2A93B] border-b-2 border-[#F2A93B]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Payment Transactions ({payments.length})
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`pb-3 transition-colors ${
            activeTab === 'expenses'
              ? 'text-rose-400 border-b-2 border-rose-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Expense Tracking ({expenses.length})
        </button>
      </div>

      {/* Tables based on tab */}
      {activeTab === 'payments' ? (
        <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#071e20] text-slate-400 font-semibold uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount USD</th>
                  <th className="py-3 px-4">Amount UZS</th>
                  <th className="py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No payment records logged yet.
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-slate-400">{p.date}</td>
                      <td className="py-3 px-4 font-semibold text-white">{p.guestName}</td>
                      <td className="py-3 px-4 uppercase font-mono text-[10px] text-[#2EC4B6]">
                        {p.method}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.type === 'income' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-white">${p.amountUsd}</td>
                      <td className="py-3 px-4 text-slate-400">{p.amountUzs?.toLocaleString()} UZS</td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{p.notes || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#071e20] text-slate-400 font-semibold uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Title / Purpose</th>
                  <th className="py-3 px-4">Amount USD</th>
                  <th className="py-3 px-4">Amount UZS</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No expense records logged yet.
                    </td>
                  </tr>
                ) : (
                  expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-slate-400">{e.date}</td>
                      <td className="py-3 px-4 capitalize font-semibold text-[#F2A93B]">{e.category.replace('_', ' ')}</td>
                      <td className="py-3 px-4 text-white">{e.title}</td>
                      <td className="py-3 px-4 font-bold text-rose-400">${e.amountUsd}</td>
                      <td className="py-3 px-4 text-slate-400">{e.amountUzs?.toLocaleString()} UZS</td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{e.notes || '-'}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete expense record?')) {
                              onDeleteExpense(e.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0B2B2E] border border-[#F2A93B]/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-white mb-4">Record Payment</h3>
            <form onSubmit={handleCreatePayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Guest Name</label>
                <input
                  type="text"
                  required
                  value={pGuestName}
                  onChange={(e) => setPGuestName(e.target.value)}
                  placeholder="e.g. Marc Dubois"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount (USD)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={pAmountUsd}
                    onChange={(e) => setPAmountUsd(Number(e.target.value))}
                    className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Method</label>
                  <select
                    value={pMethod}
                    onChange={(e) => setPMethod(e.target.value as any)}
                    className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
                  >
                    <option value="cash_usd">Cash USD</option>
                    <option value="cash_uzs">Cash UZS</option>
                    <option value="card">Visa/Mastercard</option>
                    <option value="transfer">Bank/Uzcard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes</label>
                <input
                  type="text"
                  value={pNotes}
                  onChange={(e) => setPNotes(e.target.value)}
                  placeholder="e.g. Room balance paid in full"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-[#F2A93B] text-[#0B2B2E] mt-2"
              >
                Log Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Record Expense Modal */}
      {expenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0B2B2E] border border-rose-500/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setExpenseModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-white mb-4">Log Operational Expense</h3>
            <form onSubmit={handleCreateExpense} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  value={eTitle}
                  onChange={(e) => setETitle(e.target.value)}
                  placeholder="e.g. Fresh bedsheets sanitization batch"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={eCategory}
                    onChange={(e) => setECategory(e.target.value as any)}
                    className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
                  >
                    <option value="utilities">Utilities & Wi-Fi</option>
                    <option value="linen_laundry">Laundry & Linens</option>
                    <option value="food_tea">Breakfast & Tea</option>
                    <option value="supplies">Cleaning Supplies</option>
                    <option value="repairs">Hostel Maintenance</option>
                    <option value="staff">Staff Wages</option>
                    <option value="marketing">Marketing & Signs</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount (USD)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={eAmountUsd}
                    onChange={(e) => setEAmountUsd(Number(e.target.value))}
                    className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes</label>
                <input
                  type="text"
                  value={eNotes}
                  onChange={(e) => setENotes(e.target.value)}
                  placeholder="Supplier name or receipt ref"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-rose-500 text-white mt-2"
              >
                Log Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
