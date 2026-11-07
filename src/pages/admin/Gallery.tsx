import React, { useRef, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  Film,
  ImageIcon,
  Link as LinkIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDivisions } from "../../hooks/useDivisions";
import { useStorage } from "../../hooks/useStorage";
import { MOCK_DIVISIONS } from "../../data/mockData";
import toast from "react-hot-toast";

export type MediaType = "image" | "video";

export interface GalleryItem {
  url: string;
  type: MediaType;
  name?: string;
  /** true when the file was selected via the file picker (blob URL, not yet uploaded) */
  isFile?: boolean;
  /** The raw File object — kept so we can upload to Storage on Save All */
  file?: File;
}

const Gallery: React.FC = () => {
  // ── Supabase data ──────────────────────────────────────────────────────────
  const {
    divisions: sbDivisions,
    loading,
    error: hookError,
    updateDivision,
    refetch,
  } = useDivisions();
  const { uploadHeroImage, uploadGalleryFiles } = useStorage();

  const [selected, setSelected] = useState<string>("");

  // Show a toast if the Supabase fetch itself fails (not just empty)
  React.useEffect(() => {
    if (hookError) toast.error(`Failed to load divisions from Supabase: ${hookError}`);
  }, [hookError]);

  // Fall back to mock data only when Supabase returns zero rows
  const usingMockData = sbDivisions.length === 0;
  const divisions = usingMockData ? MOCK_DIVISIONS : sbDivisions;

  React.useEffect(() => {
    if (!selected && divisions.length > 0) {
      setSelected(divisions[0].id);
    }
  }, [divisions, selected]);

  // ── Edit state ─────────────────────────────────────────────────────────────
  const [heroEdits, setHeroEdits] = useState<Record<string, string>>({});
  const [heroFile, setHeroFile] = useState<Record<string, File>>({});
  const [galleryEdits, setGalleryEdits] = useState<Record<string, GalleryItem[]>>({});
  const [saving, setSaving] = useState(false);

  const heroFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const currentDivision = divisions.find((d) => d.id === selected);
  const heroImage = heroEdits[selected] ?? currentDivision?.image ?? "";

  // Build gallery items from the DB row (or mock fallback) — include saved names
  const divisionGallery: GalleryItem[] = (currentDivision?.gallery_images ?? []).map(
    (url, i) => ({
      url,
      type: /\.(mp4|webm|ogg|mov)$/i.test(url) ? "video" : "image",
      name: currentDivision?.gallery_image_names?.[i] ?? "",
    }),
  );
  const galleryItems: GalleryItem[] = galleryEdits[selected] ?? divisionGallery;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSelect = (id: string) => setSelected(id);

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Hero image must be an image file (jpg, png, webp, etc.)");
      return;
    }
    setHeroEdits((prev) => ({ ...prev, [selected]: URL.createObjectURL(file) }));
    setHeroFile((prev) => ({ ...prev, [selected]: file }));
    toast.success(`"${file.name}" loaded — click Save All to upload to database`);
    e.target.value = "";
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }
    const invalid = files.filter(
      (f) => !f.type.startsWith("image/") && !f.type.startsWith("video/"),
    );
    if (invalid.length > 0) {
      toast.error(`${invalid.length} file(s) skipped — only images and videos allowed`);
    }
    const valid = files.filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/"),
    );
    if (valid.length === 0) {
      toast.error("No valid files to add");
      return;
    }
    const newItems: GalleryItem[] = valid.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? ("video" as MediaType) : ("image" as MediaType),
      name: file.name.replace(/\.[^.]+$/, ""),
      isFile: true,
      file,
    }));
    setGalleryEdits((prev) => ({
      ...prev,
      [selected]: [...galleryItems, ...newItems],
    }));
    toast.success(`${valid.length} file(s) added — click Save All to upload to database`);
    e.target.value = "";
  };

  const addByUrl = (url: string, type: MediaType) => {
    if (!url.trim()) {
      toast.error("Please enter a URL first");
      return;
    }
    try {
      new URL(url.trim());
    } catch {
      toast.error("Invalid URL — please check and try again");
      return;
    }
    setGalleryEdits((prev) => ({
      ...prev,
      [selected]: [...galleryItems, { url: url.trim(), type }],
    }));
    toast.success(`${type === "video" ? "Video" : "Image"} added from URL`);
  };

  const updateItem = (idx: number, url: string) => {
    const arr = [...galleryItems];
    arr[idx] = { ...arr[idx], url };
    setGalleryEdits((prev) => ({ ...prev, [selected]: arr }));
  };

  const updateItemName = (idx: number, name: string) => {
    const arr = [...galleryItems];
    arr[idx] = { ...arr[idx], name };
    setGalleryEdits((prev) => ({ ...prev, [selected]: arr }));
  };

  const removeItem = (idx: number) => {
    setGalleryEdits((prev) => ({
      ...prev,
      [selected]: galleryItems.filter((_, i) => i !== idx),
    }));
  };

  // ── Save: upload blobs to Storage, then persist URLs to the DB ────────────
  const save = async () => {
    if (!currentDivision) {
      toast.error("No division selected");
      return;
    }
    if (usingMockData) {
      toast.error(
        "No divisions found in Supabase. Run the SQL setup script (supabase/storage_setup.sql) in your Supabase SQL Editor, then refresh.",
        { duration: 8000 },
      );
      return;
    }

    setSaving(true);

    try {
      // Work on a copy — never mutate state arrays in place
      const items = [...(galleryEdits[selected] ?? divisionGallery)];
      let finalHero = heroEdits[selected] ?? currentDivision.image ?? "";

      // ── Step 1: Upload hero image to Storage if it's still a blob ──────────
      if (finalHero.startsWith("blob:") && heroFile[selected]) {
        toast("Uploading hero image to storage...", { icon: "⏳" });
        const { url, error: upErr } = await uploadHeroImage(selected, heroFile[selected]);
        if (upErr || !url) {
          toast.error(`Hero upload failed: ${upErr ?? "Unknown error"}. Nothing was saved.`);
          return;
        }
        finalHero = url;
        toast.success("Hero image uploaded to storage");
      }

      // ── Step 2: Upload gallery files (blob URLs) to Storage ───────────────
      const fileIndices: number[] = [];
      const filesToUpload: File[] = [];
      items.forEach((item, idx) => {
        if (item.isFile && item.file && item.url.startsWith("blob:")) {
          filesToUpload.push(item.file);
          fileIndices.push(idx);
        }
      });

      if (filesToUpload.length > 0) {
        toast(`Uploading ${filesToUpload.length} file(s) to storage...`, { icon: "⏳" });
        const { results } = await uploadGalleryFiles(selected, filesToUpload);

        // Each result carries its original index — map URL back to the right item
        const failedUploads: string[] = [];
        let successCount = 0;

        for (const r of results) {
          const itemIdx = fileIndices[r.index];
          if (r.error) {
            failedUploads.push(`${r.fileName}: ${r.error}`);
          } else if (r.url && itemIdx !== undefined) {
            items[itemIdx] = {
              ...items[itemIdx],
              url: r.url,
              isFile: false,
              file: undefined,
            };
            successCount++;
          }
        }

        if (failedUploads.length > 0) {
          failedUploads.forEach((err) => toast.error(`Upload failed: ${err}`));
          toast.error(
            `${failedUploads.length} of ${filesToUpload.length} file(s) failed. Nothing was saved — fix the errors and try again.`,
            { duration: 6000 },
          );
          return;
        }

        if (successCount > 0) {
          toast.success(`${successCount} file(s) uploaded to storage`);
        }
      }

      // ── Step 3: Persist the final URLs to the divisions table ────────────
      toast("Saving to database...", { icon: "⏳" });
      const { error } = await updateDivision(selected, {
        image: finalHero,
        gallery_images: items.map((i) => i.url),
        gallery_image_names: items.map((i) => i.name ?? ""),
      });

      if (error) {
        toast.error(`Database save failed: ${error}`);
        return;
      }

      // ── Step 4: Refetch from Supabase so the UI shows real DB data ───────
      await refetch();

      // Clear edits for this division
      setHeroEdits((prev) => {
        const n = { ...prev };
        delete n[selected];
        return n;
      });
      setHeroFile((prev) => {
        const n = { ...prev };
        delete n[selected];
        return n;
      });
      setGalleryEdits((prev) => {
        const n = { ...prev };
        delete n[selected];
        return n;
      });

      toast.success("Gallery saved successfully");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save gallery");
    } finally {
      setSaving(false);
    }
  };

  // ── Styling ────────────────────────────────────────────────────────────────
  const inputBase =
    "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase =
    "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  const [urlInput, setUrlInput] = useState("");
  const [urlType, setUrlType] = useState<MediaType>("image");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand-gold)" }}>
          Management
        </p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: "var(--brand-deep)" }}>
          Gallery
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload images and videos for each division. Files upload to the database on Save All.
        </p>
      </div>

      {/* Mock data warning */}
      {usingMockData && (
        <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-amber-200 bg-amber-50">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-700">No divisions found in Supabase</p>
            <p className="text-xs text-amber-600 mt-1">
              You're seeing mock data. Run the SQL setup script at{" "}
              <code className="px-1 py-0.5 bg-amber-100 rounded">supabase/storage_setup.sql</code>{" "}
              in your Supabase SQL Editor to create the storage buckets and seed the divisions table,
              then refresh this page. Saving is disabled until real data exists.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-5">
        {/* Division selector */}
        <div className="w-52 shrink-0 space-y-1.5">
          {divisions.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelect(d.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selected === d.id ? "" : "hover:bg-slate-100 text-slate-600"}`}
              style={selected === d.id ? { background: "var(--brand-deep)", color: "var(--brand-gold)" } : undefined}
            >
              {d.short_name}
            </button>
          ))}
        </div>

        {/* Editor */}
        {currentDivision && (
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg" style={{ color: "var(--brand-deep)" }}>
                {currentDivision.name}
              </h2>
              <button
                onClick={save}
                disabled={saving || usingMockData}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
                style={{ background: "var(--brand-deep)", color: "var(--brand-gold)" }}
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> Save All</>
                )}
              </button>
            </div>

            {/* Hero Image */}
            <div>
              <label className={labelBase}>Hero Image</label>
              <p className="text-xs text-slate-400 mb-3">
                Main banner image shown on the division page and cards.
              </p>
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
                value={heroImage.startsWith("blob:") ? "" : heroImage}
                onChange={(e) => {
                  setHeroEdits((prev) => ({ ...prev, [selected]: e.target.value }));
                  setHeroFile((prev) => {
                    const n = { ...prev };
                    delete n[selected];
                    return n;
                  });
                }}
                placeholder="https://images.unsplash.com/..."
              />
              {heroImage && (
                <div className="mt-3 relative rounded-2xl overflow-hidden aspect-[16/6] bg-slate-100">
                  <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                  {heroImage.startsWith("blob:") && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/50 text-white text-[10px] font-semibold">
                      File selected — will upload on Save All
                    </span>
                  )}
                  <a
                    href={heroImage}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Gallery Media */}
            <div>
              <label className={labelBase}>Gallery Media ({galleryItems.length} items)</label>
              <p className="text-xs text-slate-400 mb-4">
                Upload images or videos, or add by URL. Files upload to the database on Save All.
              </p>
              <input ref={galleryFileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleGalleryUpload} />
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => galleryFileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
                  style={{ borderColor: "var(--brand-gold)", color: "var(--brand-deep)", background: "rgba(253,191,2,0.06)" }}
                >
                  <Upload className="w-4 h-4" /> Upload Files
                </button>
                <span className="text-xs text-slate-400 self-center">
                  Images &amp; videos accepted · multiple files allowed
                </span>
              </div>

              {/* Add by URL */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    className={`${inputBase} pl-9`}
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste image or video URL..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addByUrl(urlInput, urlType);
                        setUrlInput("");
                      }
                    }}
                  />
                </div>
                <select
                  className="px-3 py-2.5 rounded-xl text-sm border border-slate-200 bg-white text-slate-700 outline-none"
                  value={urlType}
                  onChange={(e) => setUrlType(e.target.value as MediaType)}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <button
                  onClick={() => {
                    addByUrl(urlInput, urlType);
                    setUrlInput("");
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
                  style={{ color: "var(--brand-deep)" }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Gallery items */}
              {galleryItems.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
                  No media yet. Upload files or add URLs above.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {galleryItems.map((item, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          {item.type === "video" ? (
                            <Film className="w-4 h-4 text-purple-500" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-blue-500" />
                          )}
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === "video" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                            {item.type}
                          </span>
                          {item.name && (
                            <span className="text-xs text-slate-400 truncate max-w-[200px]">
                              {item.name}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-3">
                        <input
                          className={inputBase}
                          value={item.name ?? ""}
                          onChange={(e) => updateItemName(idx, e.target.value)}
                          placeholder="Image name (e.g. Lekki Duplex)"
                        />
                        <input
                          className={inputBase}
                          value={item.url.startsWith("blob:") ? (item.file?.name ?? "File selected") : item.url}
                          onChange={(e) => updateItem(idx, e.target.value)}
                          placeholder="URL"
                          readOnly={item.url.startsWith("blob:")}
                        />
                      </div>
                      {item.url && (
                        <div className="px-4 pb-4">
                          {item.type === "video" ? (
                            <video src={item.url} controls className="w-full rounded-xl max-h-56 bg-black" />
                          ) : (
                            <div className="relative">
                              <img
                                src={item.url}
                                alt={`Gallery ${idx + 1}`}
                                className="h-64 w-full object-cover rounded-xl border border-slate-100"
                              />
                              {!item.url.startsWith("blob:") && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
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
