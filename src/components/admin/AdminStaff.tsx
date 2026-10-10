import React, { useState } from 'react';
import { StaffUser } from '../../types';
import { UserCheck, Plus, Trash2, Shield, X, Check } from 'lucide-react';

export const AdminStaff: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffUser[]>([
    {
      id: 'staff-1',
      uid: 'owner-uid',
      name: 'Ummon Owner (Tashkent)',
      email: 'baithon1122@gmail.com',
      role: 'owner',
      isActive: true,
      createdAt: '2026-09-01T00:00:00Z',
    },
    {
      id: 'staff-2',
      uid: 'staff-uid-1',
      name: 'Nodirbek (Day Manager)',
      email: 'nodir@ummonhostel.uz',
      role: 'staff',
      isActive: true,
      createdAt: '2026-09-15T00:00:00Z',
    },
    {
      id: 'staff-3',
      uid: 'staff-uid-2',
      name: 'Dilnoza (Night Desk)',
      email: 'dilnoza@ummonhostel.uz',
      role: 'staff',
      isActive: true,
      createdAt: '2026-10-01T00:00:00Z',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'owner' | 'staff'>('staff');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStaffList([
      ...staffList,
      {
        id: `staff-${Date.now()}`,
        uid: `uid-${Date.now()}`,
        name,
        email,
        role,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ]);

    setModalOpen(false);
    setName('');
    setEmail('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Revoke access for this account?')) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Staff & Team Access (Owner Only)
          </h2>
          <p className="text-xs text-slate-400">
            Grant front desk staff access to room bookings while safeguarding financial records.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0B2B2E] bg-[#F2A93B] hover:brightness-110 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#071e20] text-slate-400 font-semibold uppercase text-[10px] border-b border-white/10">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {staffList.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">{s.name}</td>
                <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">{s.email}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      s.role === 'owner'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}
                  >
                    {s.role}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Active</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {s.role !== 'owner' && (
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Remove Staff Access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0B2B2E] border border-[#F2A93B]/40 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-bold text-white mb-4">Add Staff Account</h3>

            <form onSubmit={handleAddStaff} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jasur Alimov"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jasur@ummonhostel.uz"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Permission</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
                >
                  <option value="staff">Staff (Bookings & Rooms only)</option>
                  <option value="owner">Owner (Full Admin & Financials)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-[#F2A93B] text-[#0B2B2E] mt-2 shadow-md"
              >
                Add Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
