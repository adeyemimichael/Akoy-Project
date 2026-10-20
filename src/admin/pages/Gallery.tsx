import React, { useEffect, useState } from "react";
import { Save, Plus, Trash2, Image, ExternalLink } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import type { Division } from "../../types/supabase";
import toast from "react-hot-toast";

const Gallery: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [dbEmpty, setDbEmpty] = useState(false);

  useEffect(() => {
    loadDivisions();
  }, []);

  const loadDivisions = async () => {
    const { data } = await supabase.from("divisions").select("id,name,short_name,image,gallery_images").order("name");
    if (!data || data.length === 0) { setDbEmpty(true); setLoading(false); return; }
    setDivisions(data as Division[]);
    const first = data[0];
    setSelected(first.id);
    setGalleryImages(first.gallery_images ?? []);
    setHeroImage(first.image ?? "");
    setLoading(false);
  };

  const handleSelect = (id: string) => {
    const div = divisions.find(d => d.id === id);
    if (!div) return;
    setSelected(id);
    setGalleryImages(div.gallery_images ?? []);
    setHeroImage(div.image ?? "");
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("divisions").update({
      image: heroImage,
      gallery_images: galleryImages.filter(Boolean),
      updated_at: new Date().toISOString(),
    }).eq("id", selected);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Gallery updated");
    setDivisions(prev => prev.map(d => d.id === selected ? { ...d, image: heroImage, gallery_images: galleryImages.filter(Boolean) } : d));
  };

  const inputBase = "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase = "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  const currentDivision = divisions.find(d => d.id === selected);

  if (loading) return <div className="p-10 text-center text-slate-400 animate-pulse">Loading gallery...</div>;

  if (dbEmpty) return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Gallery</h1>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400 text-sm">
        No divisions found in database. Seed them first via the <strong>Divisions</strong> page.
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Gallery</h1>
        <p className="text-sm text-slate-500 mt-1">Manage hero and gallery images for each division.</p>
      </div>

      <div className="flex gap-5">
        {/* Division selector */}
        <div className="w-52 shrink-0 space-y-1.5">
          {divisions.map(d => (
            <button
              key={d.id}
              onClick={() => handleSelect(d.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selected === d.id ? "" : "hover:bg-slate-100 text-slate-600"}`}
              style={selected === d.id ? { background: 'var(--brand-deep)', color: 'var(--brand-gold)' } : undefined}
            >
              {d.short_name}
            </button>
          ))}
        </div>

        {/* Editor */}
        {currentDivision && (
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg" style={{ color: 'var(--brand-deep)' }}>{currentDivision.name}</h2>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Images"}
              </button>
            </div>

            {/* Hero Image */}
            <div>
              <label className={labelBase}>Hero Image URL</label>
              <input
                className={inputBase}
                value={heroImage}
                onChange={e => setHeroImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              {heroImage && (
                <div className="mt-3 relative rounded-2xl overflow-hidden aspect-[16/6] bg-slate-100">
                  <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                  <a href={heroImage} target="_blank" rel="noreferrer" className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelBase}>Gallery Images ({galleryImages.length})</label>
                <button
                  onClick={() => setGalleryImages(prev => [...prev, ""])}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {galleryImages.map((url, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          className={`${inputBase} pl-9`}
                          value={url}
                          onChange={e => {
                            const arr = [...galleryImages];
                            arr[idx] = e.target.value;
                            setGalleryImages(arr);
                          }}
                          placeholder={`Gallery image ${idx + 1} URL`}
                        />
                      </div>
                      <button
                        onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                        className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {url && (
                      <img src={url} alt={`Gallery ${idx + 1}`} className="h-28 w-full object-cover rounded-xl border border-slate-100" />
                    )}
                  </div>
                ))}
              </div>

              {galleryImages.length === 0 && (
                <div className="py-10 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
                  No gallery images. Click "Add Image" to start.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
