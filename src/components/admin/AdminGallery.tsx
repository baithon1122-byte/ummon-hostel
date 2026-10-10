import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

interface AdminGalleryProps {
  galleryItems: GalleryItem[];
  onAddItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => void;
  onDeleteItem: (id: string) => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({
  galleryItems,
  onAddItem,
  onDeleteItem,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'rooms' | 'common' | 'tashkent'>('common');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    onAddItem({
      title,
      category,
      imageUrl,
      caption: caption || undefined,
    });

    setModalOpen(false);
    setTitle('');
    setImageUrl('');
    setCaption('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Photo Gallery Manager
          </h2>
          <p className="text-xs text-slate-400">
            Upload and organize visuals for rooms, garden lounge, and Tashkent city highlights.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0B2B2E] bg-[#F2A93B] hover:brightness-110 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-black/40 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#071e20]/80 text-[#F2A93B] border border-[#F2A93B]/40">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-serif font-bold text-white text-base mb-1">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-slate-300 font-light line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 border-t border-white/10 bg-[#071e20]/50 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm('Delete photo from gallery?')) {
                    onDeleteItem(item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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
            <h3 className="font-serif text-xl font-bold text-white mb-4">Add Gallery Photo</h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Traditional Tea Tapchan"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
                >
                  <option value="rooms">Rooms & Pods</option>
                  <option value="common">Common Area & Courtyard</option>
                  <option value="tashkent">Tashkent Highlights</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short description displayed on lightbox"
                  className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-[#F2A93B] text-[#0B2B2E] mt-2 shadow-md"
              >
                Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
