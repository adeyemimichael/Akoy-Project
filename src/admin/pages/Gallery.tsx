import React, { useRef, useState } from "react";
import { Save, Plus, Trash2, ExternalLink, Upload, Film, ImageIcon, Link as LinkIcon } from "lucide-react";
import type { Division } from "../../types/supabase";
import { MOCK_DIVISIONS } from "../data/mockData";
import toast from "react-hot-toast";

type MediaType = "image" | "video";

interface GalleryItem {
  url: string;
  type: MediaType;
  name?: string;
}

// Convert division gallery_images (string[]) to GalleryItem[]
const toItems = (urls: string[]): GalleryItem[] =>
  urls.map(url => ({
    url,
    type: /\.(mp4|webm|ogg|mov)$/i.test(url) ? "video" : "image",
  }));

// Convert GalleryItem[] back to string[]
const toUrls = (items: GalleryItem[]): string[] => items.map(i => i.url);

const Gallery: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>(MOCK_DIVISIONS);
  const [selected, setSelected] = useState<string>(MOCK_DIVISIONS[0]?.id ?? "");

  // Track edits per division
  const [heroEdits, setHeroEdits] = useState<Record<string, string>>({});
  const [galleryEdits, setGalleryEdits] = useState<Record<string, GalleryItem[]>>({});

  const heroFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const currentDivision = divisions.find(d => d.id === selected);
  const heroImage = heroEdits[selected] ?? currentDivision?.image ?? "";
  const galleryItems: GalleryItem[] = galleryEdits[selected] ?? toItems(currentDivision?.gallery_images ?? []);

  const handleSelect = (id: string) => setSelected(id);

  // ── Hero image upload ──────────────────────────────────────────
  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Hero must be an image file"); return; }
    const objectUrl = URL.createObjectURL(file);
    setHeroEdits(prev => ({ ...prev, [selected]: objectUrl }));
    toast.success(`"${file.name}" loaded as hero image`);
    // TODO (Supabase): const { data } = await supabase.storage.from("gallery").upload(`${selected}/hero/${file.name}`, file)
    // then setHeroEdits(prev => ({ ...prev, [selected]: data.publicUrl }))
  };

  // ── Gallery file upload (image or video) ──────────────────────
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const newItems: GalleryItem[] = files.map(file => {
      const type: MediaType = file.type.startsWith("video/") ? "video" : "image";
      const objectUrl = URL.createObjectURL(file);
      return { url: objectUrl, type, name: file.name };
    });

    setGalleryEdits(prev => ({
      ...prev,
      [selected]: [...galleryItems, ...newItems],
    }));

    toast.success(`${files.length} file${files.length > 1 ? "s" : ""} added`);
    // TODO (Supabase): for each file → supabase.storage.from("gallery").upload(`${selected}/${file.name}`, file)
    // then push the returned publicUrl into galleryItems
  };

  // ── Add by URL ─────────────────────────────────────────────────
  const addByUrl = (url: string, type: MediaType) => {
    if (!url.trim()) return;
    setGalleryEdits(prev => ({
      ...prev,
      [selected]: [...galleryItems, { url: url.trim(), type }],
    }));
  };

  const updateItem = (idx: number, url: string) => {
    const arr = [...galleryItems];
    arr[idx] = { ...arr[idx], url };
    setGalleryEdits(prev => ({ ...prev, [selected]: arr }));
  };

  const removeItem = (idx: number) => {
    setGalleryEdits(prev => ({
      ...prev,
      [selected]: galleryItems.filter((_, i) => i !== idx),
    }));
  };

  // ── Save ───────────────────────────────────────────────────────
  const save = () => {
    setDivisions(prev => prev.map(d => {
      if (d.id !== selected) return d;
      return {
        ...d,
        image: heroEdits[selected] ?? d.image,
        gallery_images: toUrls(galleryEdits[selected] ?? toItems(d.gallery_images)),
        updated_at: new Date().toISOString(),
      };
    }));
    setHeroEdits(prev => { const n = { ...prev }; delete n[selected]; return n; });
    setGalleryEdits(prev => { const n = { ...prev }; delete n[selected]; return n; });
    toast.success("Gallery saved");
  };

  const inputBase = "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase = "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  // ── URL add row state ──────────────────────────────────────────
  const [urlInput, setUrlInput] = useState("");
  const [urlType, setUrlType] = useState<MediaType>("image");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Gallery</h1>
        <p className="text-sm text-slate-500 mt-1">Upload images and videos for each division. Supports file upload or URL.</p>
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
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg" style={{ color: 'var(--brand-deep)' }}>{currentDivision.name}</h2>
              <button
                onClick={save}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
              >
                <Save className="w-4 h-4" />
                Save All
              </button>
            </div>

            {/* ── Hero Image ── */}
            <div>
              <label className={labelBase}>Hero Image</label>
              <p className="text-xs text-slate-400 mb-3">This is the main banner image shown on the division page and cards.</p>

              {/* Upload button */}
              <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => heroFileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-dashed border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Upload Image
                </button>
                <span className="text-xs text-slate-400 self-center">or paste a URL below</span>
              </div>

              <input
                className={inputBase}
                value={heroImage}
                onChange={e => setHeroEdits(prev => ({ ...prev, [selected]: e.target.value }))}
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

            {/* ── Gallery Media ── */}
            <div>
              <label className={labelBase}>Gallery Media ({galleryItems.length} items)</label>
              <p className="text-xs text-slate-400 mb-4">Upload images or videos, or add by URL. Videos show a player preview.</p>

              {/* Upload buttons */}
              <input
                ref={galleryFileRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
              />
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => galleryFileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
                  style={{ borderColor: 'var(--brand-gold)', color: 'var(--brand-deep)', background: 'rgba(253,191,2,0.06)' }}
                >
                  <Upload className="w-4 h-4" /> Upload Files
                </button>
                <span className="text-xs text-slate-400 self-center">Images & videos accepted · multiple files allowed</span>
              </div>

              {/* Add by URL row */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    className={`${inputBase} pl-9`}
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder="Paste image or video URL..."
                    onKeyDown={e => { if (e.key === "Enter") { addByUrl(urlInput, urlType); setUrlInput(""); } }}
                  />
                </div>
                <select
                  className="px-3 py-2.5 rounded-xl text-sm border border-slate-200 bg-white text-slate-700 outline-none"
                  value={urlType}
                  onChange={e => setUrlType(e.target.value as MediaType)}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <button
                  onClick={() => { addByUrl(urlInput, urlType); setUrlInput(""); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
                  style={{ color: 'var(--brand-deep)' }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Gallery grid */}
              {galleryItems.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
                  No media yet. Upload files or add URLs above.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {galleryItems.map((item, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                      {/* Type badge + controls */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          {item.type === "video"
                            ? <Film className="w-4 h-4 text-purple-500" />
                            : <ImageIcon className="w-4 h-4 text-blue-500" />
                          }
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === "video" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                            {item.type}
                          </span>
                          {item.name && <span className="text-xs text-slate-400 truncate max-w-[200px]">{item.name}</span>}
                        </div>
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* URL input */}
                      <div className="px-4 py-3">
                        <input
                          className={inputBase}
                          value={item.url}
                          onChange={e => updateItem(idx, e.target.value)}
                          placeholder="URL"
                        />
                      </div>

                      {/* Preview */}
                      {item.url && (
                        <div className="px-4 pb-4">
                          {item.type === "video" ? (
                            <video
                              src={item.url}
                              controls
                              className="w-full rounded-xl max-h-56 bg-black"
                            />
                          ) : (
                            <div className="relative">
                              <img
                                src={item.url}
                                alt={`Gallery ${idx + 1}`}
                                className="h-40 w-full object-cover rounded-xl border border-slate-100"
                              />
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
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
