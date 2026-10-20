import React, { useEffect, useState } from "react";
import { Save, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import type { SiteSetting } from "../../types/supabase";
import toast from "react-hot-toast";

// Default settings to seed if none exist in DB
const DEFAULT_SETTINGS: Omit<SiteSetting, "id" | "updated_at">[] = [
  { key: "phone_primary",    label: "Primary Phone",           value: "+234 (0) 800 360 AKOY" },
  { key: "phone_whatsapp",   label: "WhatsApp Number",         value: "2348123456789" },
  { key: "email_general",    label: "General Email",           value: "contact@akoy360.com" },
  { key: "email_diaspora",   label: "Diaspora Email",          value: "diaspora@akoy360.com" },
  { key: "address_hq",       label: "HQ Address",              value: "Victoria Island / Ikoyi Commercial Corridor, Lagos, Nigeria" },
  { key: "address_london",   label: "London Desk Address",     value: "London, United Kingdom" },
  { key: "address_houston",  label: "Houston Desk Address",    value: "Houston, Texas, USA" },
  { key: "social_twitter",   label: "Twitter / X URL",         value: "https://twitter.com/akoy360" },
  { key: "social_instagram", label: "Instagram URL",           value: "https://instagram.com/akoy360" },
  { key: "social_linkedin",  label: "LinkedIn URL",            value: "https://linkedin.com/company/akoy360" },
  { key: "whatsapp_message", label: "Default WhatsApp Message",value: "Hello AKOY 360, I would like to learn more about your services." },
  { key: "office_hours",     label: "Office Hours",            value: "Mon - Sat, 8:00 AM - 6:00 PM (WAT)" },
];

const GROUPS: { title: string; keys: string[] }[] = [
  { title: "Contact Details",   keys: ["phone_primary", "phone_whatsapp", "email_general", "email_diaspora", "office_hours"] },
  { title: "Office Locations",  keys: ["address_hq", "address_london", "address_houston"] },
  { title: "Social Media",      keys: ["social_twitter", "social_instagram", "social_linkedin"] },
  { title: "Messaging",         keys: ["whatsapp_message"] },
];

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*");
    setSettings(data ?? []);
    setLoading(false);
  };

  const seed = async () => {
    setSeeding(true);
    const { error } = await supabase.from("site_settings").upsert(
      DEFAULT_SETTINGS.map(s => ({ ...s, updated_at: new Date().toISOString() })),
      { onConflict: "key" }
    );
    setSeeding(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Default settings loaded");
    load();
  };

  const getValue = (key: string) => {
    if (key in edits) return edits[key];
    return settings.find(s => s.key === key)?.value ?? "";
  };

  const hasChanges = Object.keys(edits).length > 0;

  const saveAll = async () => {
    if (!hasChanges) { toast("No changes to save"); return; }
    setSaving(true);
    const updates = Object.entries(edits).map(([key, value]) =>
      supabase.from("site_settings").update({ value, updated_at: new Date().toISOString() }).eq("key", key)
    );
    const results = await Promise.all(updates);
    const failed = results.filter(r => r.error);
    setSaving(false);
    if (failed.length) { toast.error(`${failed.length} setting(s) failed to save`); return; }
    toast.success("All settings saved");
    setEdits({});
    load();
  };

  const inputBase = "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase = "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  if (loading) return <div className="p-10 text-center text-slate-400 animate-pulse">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>Management</p>
          <h1 className="text-2xl font-extrabold font-display mt-0.5" style={{ color: 'var(--brand-deep)' }}>Site Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Update contact details, social links, and global site content.</p>
        </div>
        <div className="flex gap-2">
          {settings.length === 0 && (
            <button
              onClick={seed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all disabled:opacity-50"
              style={{ color: 'var(--brand-deep)' }}
            >
              <RefreshCw className={`w-4 h-4 ${seeding ? "animate-spin" : ""}`} />
              {seeding ? "Loading..." : "Load Defaults"}
            </button>
          )}
          <button
            onClick={saveAll}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
            style={{ background: 'var(--brand-deep)', color: 'var(--brand-gold)' }}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : `Save${hasChanges ? ` (${Object.keys(edits).length})` : ""}`}
          </button>
        </div>
      </div>

      {settings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-10 h-10 text-amber-400" />
          <h2 className="text-lg font-bold" style={{ color: 'var(--brand-deep)' }}>No settings in database yet</h2>
          <p className="text-sm text-slate-500 max-w-sm">Click "Load Defaults" to seed the database with the current site values.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {GROUPS.map(group => (
            <div key={group.title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-5 pb-3 border-b border-slate-100" style={{ color: 'var(--brand-deep)' }}>
                {group.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.keys.map(key => {
                  const setting = settings.find(s => s.key === key);
                  if (!setting) return null;
                  const isEdited = key in edits;
                  return (
                    <div key={key}>
                      <label className={labelBase}>
                        {setting.label}
                        {isEdited && <span className="ml-2 text-amber-500 normal-case font-normal tracking-normal">• unsaved</span>}
                      </label>
                      {setting.value.length > 80 ? (
                        <textarea
                          rows={3}
                          className={`${inputBase} resize-none`}
                          value={getValue(key)}
                          onChange={e => setEdits(p => ({ ...p, [key]: e.target.value }))}
                          style={isEdited ? { borderColor: '#f59e0b' } : undefined}
                        />
                      ) : (
                        <input
                          className={inputBase}
                          value={getValue(key)}
                          onChange={e => setEdits(p => ({ ...p, [key]: e.target.value }))}
                          style={isEdited ? { borderColor: '#f59e0b' } : undefined}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiteSettings;
