import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SiteSetting } from "../types/supabaseType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseSiteSettingsReturn {
  settings: SiteSetting[];
  /** Convenience lookup: get a setting value by its key. Returns "" if not found. */
  getSetting: (key: string) => string;
  loading: boolean;
  error: string | null;
  /**
   * Admin: persist one or more key→value changes in a single batch upsert.
   * Pass a plain object like { phone_primary: "...", email_general: "..." }.
   */
  saveSettings: (
    changes: Record<string, string>,
  ) => Promise<{ error: string | null }>;
  /**
   * Admin: reset a specific key back to its default value.
   * Pass the default value you want to restore.
   */
  resetSetting: (
    key: string,
    defaultValue: string,
  ) => Promise<{ error: string | null }>;
  /** Manually refetch. */
  refetch: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Fetches and manages site-wide settings (contact info, social links, etc.).
 *
 * Public pages:  use `getSetting("phone_primary")` etc. to display contact details.
 * Admin panel:   use `saveSettings({ key: value, ... })` to persist edits in bulk.
 *
 * @example
 * // Public footer / contact page
 * const { getSetting } = useSiteSettings();
 * const phone = getSetting("phone_primary");
 *
 * // Admin settings page
 * const { settings, saveSettings } = useSiteSettings();
 * await saveSettings({ phone_primary: newPhone });
 */
export function useSiteSettings(): UseSiteSettingsReturn {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("key");
    if (error) {
      setError(error.message);
    } else {
      setSettings(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const getSetting = useCallback(
    (key: string): string => settings.find((s) => s.key === key)?.value ?? "",
    [settings],
  );

  // ── Mutations ──────────────────────────────────────────────────────────────

  const saveSettings = useCallback(
    async (
      changes: Record<string, string>,
    ): Promise<{ error: string | null }> => {
      // Build an upsert payload; we need the label too, so we look it up from current state.
      const rows = Object.entries(changes).map(([key, value]) => {
        const existing = settings.find((s) => s.key === key);
        return {
          key,
          value,
          label: existing?.label ?? key, // fallback to key if label unknown
          updated_at: new Date().toISOString(),
        };
      });

      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });

      if (error) return { error: error.message };

      // Optimistic local update
      setSettings((prev) =>
        prev.map((s) =>
          changes[s.key] !== undefined
            ? {
                ...s,
                value: changes[s.key],
                updated_at: new Date().toISOString(),
              }
            : s,
        ),
      );
      return { error: null };
    },
    [settings],
  );

  const resetSetting = useCallback(
    async (
      key: string,
      defaultValue: string,
    ): Promise<{ error: string | null }> => {
      return saveSettings({ [key]: defaultValue });
    },
    [saveSettings],
  );

  return {
    settings,
    getSetting,
    loading,
    error,
    saveSettings,
    resetSetting,
    refetch: fetch,
  };
}
