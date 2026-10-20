import React, { useEffect, useState } from "react";
import { Plus, Save, Trash2, Eye, EyeOff, Star, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import type { Testimonial } from "../../types/supabase";
import toast from "react-hot-toast";

const EMPTY: Omit<Testimonial, "id" | "created_at"> = {
  name: "", title: "", location: "", division: "properties",
  rating: 5, quote: "", initials: "", published: true, sort_order: 0,
};

const DIVISIONS = ["properties", "construction", "travel", "logistics", "business-services", "diaspora"];

const Testimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  const openNew = () => { setForm({ ...EMPTY }); setEditId(null); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, title: t.title, location: t.location, division: t.division, rating: t.rating, quote: t.quote, initials: t.initials, published: t.published, sort_order: t.sort_order });
    setEditId(t.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.quote) { toast.error("Name and quote are required"); return; }
    setSaving(true);
    if (editId) {
      const { error } = await supabase.from("testimonials").update(form).eq("id", editId);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Testimonial updated");
    } else {
      const { error } = await supabase.from("testimonials").insert(form);
      if (error) { toast.error(error.message); setSaving(false); return; }
      toast.success("Testimonial added");
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const togglePublish = async (t: Testimonial) => {
    const { error } = await supabase.from("testimonials").update({ published: !t.published }).eq("id", t.id);
    if (error) { toast.error(error.message); return; }
    setItems(prev => prev.map(i => i.id === t.id ? { ...i, published: !t.published } : i));
    toast.success(t.published ? "Unpublished" : "Published");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    setItems(prev => prev.filter(i => i.id !== id));
    if (editId === id) setShowForm(false);
  };

  const inputBase = "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase = "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
          <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Testimonials</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, publish or unpublish client testimonials.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1 space-y-3">
          {loading ? (
            <div className="p-10 text-center text-slate-400 animate-pulse">Loading...</div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400 text-sm">
              No testimonials yet. Add your first one.
            </div>
          ) : (
            items.map(t => (
              <div key={t.id} className={`bg-white rounded-2xl border p-5 transition-all ${editId === t.id ? "border-amber-200" : "border-slate-100"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-black text-sm" style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}>
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-sm" style={{ color: 'var(--brand-deep)' }}>{t.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${t.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                          {t.published ? "Published" : "Draft"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500 capitalize">{t.division}</span>
                      </div>
                      <p className="text-xs text-slate-400">{t.title} · {t.location}</p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--brand-gold)' }} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">"{t.quote}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => togglePublish(t)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                      {t.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-amber-50 transition-colors text-slate-400 hover:text-amber-600">
                      <Save className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(t.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form panel */}
        {showForm && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 p-5 space-y-4 self-start sticky top-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm" style={{ color: 'var(--brand-deep)' }}>{editId ? "Edit Testimonial" : "New Testimonial"}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelBase}>Name *</label>
                  <input className={inputBase} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Dr. John Doe" />
                </div>
                <div>
                  <label className={labelBase}>Initials</label>
                  <input className={inputBase} value={form.initials} onChange={e => setForm(p => ({ ...p, initials: e.target.value }))} placeholder="JD" maxLength={3} />
                </div>
              </div>
              <div>
                <label className={labelBase}>Title</label>
                <input className={inputBase} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="CEO, Company Name" />
              </div>
              <div>
                <label className={labelBase}>Location</label>
                <input className={inputBase} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="London, UK" />
              </div>
              <div>
                <label className={labelBase}>Division</label>
                <select className={inputBase} value={form.division} onChange={e => setForm(p => ({ ...p, division: e.target.value }))}>
                  {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelBase}>Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setForm(p => ({ ...p, rating: n }))}>
                      <Star className={`w-5 h-5 transition-colors ${n <= form.rating ? "fill-current" : "text-slate-200"}`} style={{ color: n <= form.rating ? 'var(--brand-gold)' : undefined }} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelBase}>Quote *</label>
                <textarea rows={4} className={`${inputBase} resize-none`} value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} placeholder="Client testimonial text..." />
              </div>
              <div>
                <label className={labelBase}>Sort Order</label>
                <input type="number" className={inputBase} value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: Number(e.target.value) }))} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} className="rounded" />
                <label htmlFor="published" className="text-sm font-medium text-slate-600">Published</label>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : editId ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
