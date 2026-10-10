import React from 'react';
import { ActivityLog } from '../../types';
import { History, Shield, User, Clock, CheckCircle } from 'lucide-react';

interface AdminActivityLogsProps {
  logs: ActivityLog[];
}

export const AdminActivityLogs: React.FC<AdminActivityLogsProps> = ({ logs }) => {
  const sampleLogs: ActivityLog[] = logs.length > 0 ? logs : [
    {
      id: 'log-1',
      action: 'Checked-in Guest (Marc Dubois)',
      actorEmail: 'baithon1122@gmail.com',
      actorRole: 'owner',
      details: 'Assigned bed 2 in 4-Bed Deluxe Dorm. Cash payment USD 42 collected.',
      timestamp: '2026-10-10T09:45:00Z',
    },
    {
      id: 'log-2',
      action: 'Confirmed New Reservation BK-10822',
      actorEmail: 'nodir@ummonhostel.uz',
      actorRole: 'staff',
      details: 'Private Deluxe Queen Room booked for 4 nights.',
      timestamp: '2026-10-09T14:15:00Z',
    },
    {
      id: 'log-3',
      action: 'Updated Website Hero Headline',
      actorEmail: 'baithon1122@gmail.com',
      actorRole: 'owner',
      details: 'Published live seasonal promotion text.',
      timestamp: '2026-10-08T11:20:00Z',
    },
    {
      id: 'log-4',
      action: 'Approved Guest Review by Elena Rostova',
      actorEmail: 'baithon1122@gmail.com',
      actorRole: 'owner',
      details: '5-star review published to public website.',
      timestamp: '2026-10-07T16:00:00Z',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-white">
          System & Front Desk Activity Log
        </h2>
        <p className="text-xs text-slate-400">
          Traceable audit log of staff actions, check-ins, content updates, and financial operations.
        </p>
      </div>

      <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#071e20] border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-white">Recent Operations</span>
          <span>{sampleLogs.length} events logged</span>
        </div>

        <div className="divide-y divide-white/5">
          {sampleLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-white/5 transition-colors flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#2EC4B6]/20 text-[#2EC4B6] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="font-semibold text-white text-xs sm:text-sm truncate">
                    {log.action}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {log.details && (
                  <p className="text-xs text-slate-300 font-light mb-2">
                    {log.details}
                  </p>
                )}

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <User className="w-3 h-3 text-[#F2A93B]" />
                    <span>{log.actorEmail}</span>
                  </span>
                  <span>·</span>
                  <span className="uppercase font-mono text-[#2EC4B6]">{log.actorRole}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
