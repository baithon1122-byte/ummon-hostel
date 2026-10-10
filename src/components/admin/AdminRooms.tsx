import React, { useState } from 'react';
import { Room, RoomType } from '../../types';
import { formatPrice } from '../../utils/formatters';
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  BedDouble,
  DollarSign,
  CheckCircle2,
  XCircle,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface AdminRoomsProps {
  rooms: Room[];
  onSaveRoom: (room: Room) => void;
  onDeleteRoom: (roomId: string) => void;
  uzsRate?: number;
}

export const AdminRooms: React.FC<AdminRoomsProps> = ({
  rooms,
  onSaveRoom,
  onDeleteRoom,
  uzsRate = 12800,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<RoomType>('dorm');
  const [bedsCount, setBedsCount] = useState(4);
  const [capacity, setCapacity] = useState(4);
  const [priceUsd, setPriceUsd] = useState(14);
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openNewRoom = () => {
    setEditingRoom(null);
    setName('');
    setType('dorm');
    setBedsCount(4);
    setCapacity(4);
    setPriceUsd(14);
    setShortDesc('');
    setDescription('');
    setAmenitiesInput('Privacy Curtains, Personal Locker, AC, High-Speed Wi-Fi');
    setImagesInput('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80');
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditRoom = (room: Room) => {
    setEditingRoom(room);
    setName(room.name);
    setType(room.type);
    setBedsCount(room.bedsCount);
    setCapacity(room.capacity);
    setPriceUsd(room.priceUsd);
    setShortDesc(room.shortDescription);
    setDescription(room.description);
    setAmenitiesInput(room.amenities.join(', '));
    setImagesInput(room.images.join('\n'));
    setIsActive(room.isActive);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = amenitiesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const images = imagesInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const roomPayload: Room = {
      id: editingRoom ? editingRoom.id : `room-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      type,
      bedsCount,
      capacity,
      priceUsd,
      priceUzs: Math.round(priceUsd * uzsRate),
      shortDescription: shortDesc,
      description,
      amenities,
      images: images.length ? images : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'],
      isActive,
      updatedAt: new Date().toISOString()
    };

    onSaveRoom(roomPayload);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Rooms & Beds Management
          </h2>
          <p className="text-xs text-slate-400">
            Configure dorm layouts, private suites, night rates, photos, and live inventory.
          </p>
        </div>

        <button
          onClick={openNewRoom}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-black/40 overflow-hidden">
                <img
                  src={room.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      room.isActive
                        ? 'bg-emerald-500/80 text-white'
                        : 'bg-rose-500/80 text-white'
                    }`}
                  >
                    {room.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#071e20]/80 text-[#F2A93B] border border-[#F2A93B]/40">
                    {room.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {room.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-light">
                  {room.shortDescription}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-300 mb-3">
                  <span className="flex items-center gap-1 text-[#2EC4B6]">
                    <Users className="w-3.5 h-3.5" />
                    <span>{room.capacity} Guests</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <BedDouble className="w-3.5 h-3.5" />
                    <span>{room.bedsCount} Beds</span>
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  <span className="font-serif text-xl font-bold text-white">
                    ${room.priceUsd}
                  </span>{' '}
                  / night (≈ {room.priceUzs?.toLocaleString() || Math.round(room.priceUsd * uzsRate).toLocaleString()} UZS)
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#071e20]/50 flex items-center justify-between">
              <button
                onClick={() => openEditRoom(room)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#2EC4B6]" />
                <span>Edit Room</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete ${room.name} permanently?`)) {
                    onDeleteRoom(room.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors"
                title="Delete Room"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Room Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#0B2B2E] border border-[#F2A93B]/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Configure inventory properties visible on the booking portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Room Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 6-Bed Female Mixed Dorm"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2 text-white focus:outline-none"
                  >
                    <option value="dorm">Dorm</option>
                    <option value="private">Private</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Beds</label>
                  <input
                    type="number"
                    min={1}
                    value={bedsCount}
                    onChange={(e) => setBedsCount(Number(e.target.value))}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Capacity</label>
                  <input
                    type="number"
                    min={1}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rate (USD)</label>
                  <input
                    type="number"
                    min={1}
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(Number(e.target.value))}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="One sentence summary for room card"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed amenities, mattress type, wood material..."
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  placeholder="Privacy Curtains, Personal Locker, AC, Free Linens"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Image URLs (one URL per line)
                </label>
                <textarea
                  rows={2}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 font-mono text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-[#F2A93B] focus:ring-0 w-4 h-4"
                />
                <label htmlFor="activeToggle" className="text-slate-300 font-medium">
                  Active (Display publicly on website booking engine)
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F2A93B] hover:brightness-110 text-[#0B2B2E] font-bold shadow-md"
                >
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
