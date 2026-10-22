import React, { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import {
  loadSettings,
  saveSettings,
  resetSettings,
  type SiteSettingEntry,
  SETTING_GROUPS,
} from "../../data/siteConfig";
import toast from "react-hot-toast";

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettingEntry[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const getValue = (key: string) =>
    key in edits
      ? edits[key]
      : (settings.find((s) => s.key === key)?.value ?? "");

  const hasChanges = Object.keys(edits).length > 0;

  const saveAll = () => {
    if (!hasChanges) {
      toast("No changes to save");
      return;
    }
    const updated = settings.map((s) =>
      edits[s.key] !== undefined ? { ...s, value: edits[s.key] } : s,
    );
    setSettings(updated);
    saveSettings(updated);
    setEdits({});
    toast.success("All settings saved");
  };

  const discard = () => {
    setEdits({});
    toast("Changes discarded");
  };

  const handleReset = () => {
    if (!confirm("Reset all settings to defaults?")) return;
    const defaults = resetSettings();
    setSettings(defaults);
    setEdits({});
    toast.success("Settings reset to defaults");
  };

  const inputBase =
    "w-full px-3 py-2.5 rounded-xl text-sm border border-slate-200 outline-none bg-white focus:border-slate-400 transition-colors text-slate-700";
  const labelBase =
    "block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--brand-gold)" }}
          >
            Management
          </p>
          <h1
            className="text-2xl font-extrabold font-display mt-0.5"
            style={{ color: "var(--brand-deep)" }}
          >
            Site Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update contact details, social links, and global site content.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
            style={{ color: "var(--brand-deep)" }}
          >
            <RefreshCw className="w-4 h-4" />
            Reset Defaults
          </button>
          {hasChanges && (
            <button
              onClick={discard}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50 transition-all"
              style={{ color: "var(--brand-deep)" }}
            >
              Discard
            </button>
          )}
          <button
            onClick={saveAll}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
            style={{
              background: "var(--brand-deep)",
              color: "var(--brand-gold)",
            }}
          >
            <Save className="w-4 h-4" />
            {hasChanges ? `Save (${Object.keys(edits).length})` : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {SETTING_GROUPS.map((group) => (
          <div
            key={group.title}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-5 pb-3 border-b border-slate-100"
              style={{ color: "var(--brand-deep)" }}
            >
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.keys.map((key) => {
                const setting = settings.find((s) => s.key === key);
                if (!setting) return null;
                const isEdited = key in edits;
                const val = getValue(key);
                return (
                  <div key={key}>
                    <label className={labelBase}>
                      {setting.label}
                      {isEdited && (
                        <span className="ml-2 text-amber-500 normal-case font-normal tracking-normal">
                          • unsaved
                        </span>
                      )}
                    </label>
                    {val.length > 80 ? (
                      <textarea
                        rows={3}
                        className={`${inputBase} resize-none`}
                        value={val}
                        onChange={(e) =>
                          setEdits((p) => ({ ...p, [key]: e.target.value }))
                        }
                        style={
                          isEdited ? { borderColor: "#f59e0b" } : undefined
                        }
                      />
                    ) : (
                      <input
                        className={inputBase}
                        value={val}
                        onChange={(e) =>
                          setEdits((p) => ({ ...p, [key]: e.target.value }))
                        }
                        style={
                          isEdited ? { borderColor: "#f59e0b" } : undefined
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSettings;
