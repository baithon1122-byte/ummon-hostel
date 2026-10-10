import React from 'react';
import { ContactMessage } from '../../types';
import { Mail, Check, Trash2, Reply, Phone, Calendar, Clock } from 'lucide-react';

interface AdminMessagesProps {
  messages: ContactMessage[];
  onMarkRead: (id: string, isRead: boolean) => void;
  onDeleteMessage: (id: string) => void;
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({
  messages,
  onMarkRead,
  onDeleteMessage,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="font-serif text-2xl font-bold text-white">
          Guest Inquiries & Messages
        </h2>
        <p className="text-xs text-slate-400">
          Inquiries submitted via the public contact and airport pickup forms.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-[#0B2B2E] rounded-2xl border border-white/10">
            No guest messages received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all shadow-xl ${
                msg.isRead
                  ? 'bg-[#0B2B2E] border-white/10 opacity-80'
                  : 'bg-[#0B2B2E] border-[#2EC4B6]/50 shadow-[#2EC4B6]/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      msg.isRead ? 'bg-slate-600' : 'bg-[#2EC4B6] animate-ping'
                    }`}
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {msg.name}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        &lt;{msg.email}&gt;
                      </span>
                    </h4>
                    {msg.phone && (
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#F2A93B]" />
                        <span>{msg.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-[#F2A93B] mb-2">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs text-slate-200 leading-relaxed bg-[#071e20] p-3.5 rounded-xl border border-white/5 mb-4 whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Ummon Hostel Tashkent'}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-semibold transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5 text-[#2EC4B6]" />
                    <span>Email Reply</span>
                  </a>

                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold transition-colors"
                    >
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMarkRead(msg.id, !msg.isRead)}
                    className="text-slate-400 hover:text-white transition-colors"
                    title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete message?')) {
                        onDeleteMessage(msg.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
