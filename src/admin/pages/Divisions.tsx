import React, { useEffect, useState } from "react";
import { Save, ChevronDown, ChevronUp, Plus, Trash2, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import type { Division } from "../../types/supabase";
import { DIVISIONS_DATA } from "../../data/divisions";
import toast from "react-hot-toast";

const Divisions: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, Partial<Division>>>({});
  const [dbEmpty, setDbEmpty] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadDivisions();
  }, []);

  const loadDivisions = async () => {
    setLoading(true);
    const { data } = await supabase.from("divisions").select("*").order("name");
    if (!data || data.length === 0) {
      setDbEmpty(true);
      setLoading(false);
      return;
    }
    setDivisions(data);
    setLoading(false);
  };

  const seedFromStatic = async () => {
    setSeeding(true);
    const rows = DIVISIONS_DATA.map(d => ({
      id: d.id,
      name: d.name,
      short_name: d.shortName,
      tagline: d.tagline,
      headline: d.headline,
      description: d.description,
      bullet_points: d.bulletPoints,
      image: d.image,
      gallery_images: d.galleryImages,
      stat_value: d.stats.value,
      stat_label: d.stats.label,
      metric_primary: d.metrics.primary,
      metric_secondary: d.metrics.secondary,
      icon_name: d.iconName,
    }));
    const { error } = await supabase.from("divisions").upsert(rows);
    if (error) { toast.error("Seed failed: " + error.message); setSeeding(false); return; }
    toast.success("Divisions seeded from static data");
    setDbEmpty(false);
    setSeeding(false);
    loadDivisions();
  };

  const getEdit = (id: string) => edits[id] ?? {};
  const setField = (id: string, field: keyof Division, value: any) => {
    setEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const save = async (div: Division) => {
    const changes = edits[div.id];
    if (!changes || Object.keys(changes).length === 0) { toast("No changes to save"); return; }
    setSaving(div.id);
    const { error } = await supabase.from("divisions").update({ ...changes, updated_at: new Date().toISOString() }).eq("id", div.id);
    setSaving(null);
    if (error) { toast.error("Save failed: " + error.message); return; }
    toast.success(`${div.short_name} updated`);
    setDivisions(prev => prev.map(d => d.id === div.id ? { ...d, ...changes } : d));
    setEdits(prev => { const n = { ...prev }; delete n[div.id]; return n; });
  };

  const inputBase = "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase = "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  if (loading) return <div className="p-10 text-center text-slate-400 animate-pulse">Loading divisions...</div>;

  if (dbEmpty) return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Divisions</h1>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-10 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="w-10 h-10 text-amber-400" />
        <h2 className="text-lg font-bold" style={{ color: 'var(--brand-deep)' }}>No divisions in database yet</h2>
        <p className="text-sm text-slate-500 max-w-sm">Seed the database with the current static division data to start managing content from the admin panel.</p>
        <button
          onClick={seedFromStatic}
          disabled={seeding}
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
        >
          {seeding ? "Seeding..." : "Seed Divisions from Static Data"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
        <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Divisions</h1>
        <p className="text-sm text-slate-500 mt-1">Edit content for each of the 6 business divisions.</p>
      </div>

      <div className="space-y-3">
        {divisions.map(div => {
          const e = getEdit(div.id);
          const isExpanded = expanded === div.id;
          const hasChanges = Object.keys(e).length > 0;

          return (
            <div key={div.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : div.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
                    {div.short_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--brand-deep)' }}>{div.name}</p>
                    <p className="text-xs text-slate-400">{div.tagline}</p>
                  </div>
                  {hasChanges && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">Unsaved</span>
                  )}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-5 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
                    <div>
                      <label className={labelBase}>Name</label>
                      <input className={inputBase} value={e.name ?? div.name} onChange={ev => setField(div.id, "name", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Short Name</label>
                      <input className={inputBase} value={e.short_name ?? div.short_name} onChange={ev => setField(div.id, "short_name", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Tagline</label>
                      <input className={inputBase} value={e.tagline ?? div.tagline} onChange={ev => setField(div.id, "tagline", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Headline</label>
                      <input className={inputBase} value={e.headline ?? div.headline} onChange={ev => setField(div.id, "headline", ev.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelBase}>Description</label>
                    <textarea rows={3} className={`${inputBase} resize-none`} value={e.description ?? div.description} onChange={ev => setField(div.id, "description", ev.target.value)} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className={labelBase}>Stat Value</label>
                      <input className={inputBase} value={e.stat_value ?? div.stat_value} onChange={ev => setField(div.id, "stat_value", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Stat Label</label>
                      <input className={inputBase} value={e.stat_label ?? div.stat_label} onChange={ev => setField(div.id, "stat_label", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Metric Primary</label>
                      <input className={inputBase} value={e.metric_primary ?? div.metric_primary} onChange={ev => setField(div.id, "metric_primary", ev.target.value)} />
                    </div>
                    <div>
                      <label className={labelBase}>Metric Secondary</label>
                      <input className={inputBase} value={e.metric_secondary ?? div.metric_secondary} onChange={ev => setField(div.id, "metric_secondary", ev.target.value)} />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <label className={labelBase}>Service Bullet Points</label>
                    <div className="space-y-2">
                      {(e.bullet_points ?? div.bullet_points).map((bp, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            className={`${inputBase} flex-1`}
                            value={bp}
                            onChange={ev => {
                              const arr = [...(e.bullet_points ?? div.bullet_points)];
                              arr[idx] = ev.target.value;
                              setField(div.id, "bullet_points", arr);
                            }}
                          />
                          <button
                            onClick={() => {
                              const arr = (e.bullet_points ?? div.bullet_points).filter((_, i) => i !== idx);
                              setField(div.id, "bullet_points", arr);
                            }}
                            className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const arr = [...(e.bullet_points ?? div.bullet_points), ""];
                          setField(div.id, "bullet_points", arr);
                        }}
                        className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add bullet point
                      </button>
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className={labelBase}>Hero Image URL</label>
                    <input className={inputBase} value={e.image ?? div.image} onChange={ev => setField(div.id, "image", ev.target.value)} />
                    {(e.image ?? div.image) && (
                      <img src={e.image ?? div.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-xl border border-slate-100" />
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => save(div)}
                      disabled={saving === div.id || !hasChanges}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                      style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
                    >
                      <Save className="w-4 h-4" />
                      {saving === div.id ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Divisions;
