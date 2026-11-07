import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Division } from "../types/supabaseType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseDivisionsReturn {
  divisions: Division[];
  loading: boolean;
  error: string | null;
  /** Update one or more fields on a division. Returns { error } on failure. */
  updateDivision: (
    id: string,
    changes: Partial<Division>,
  ) => Promise<{ error: string | null }>;
  /** Manually refetch all divisions from Supabase. */
  refetch: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Fetches and manages all division records.
 *
 * Public pages: call this to get content for the site.
 * Admin pages:  call this then use updateDivision() to save edits.
 *
 * @example
 * const { divisions, loading, updateDivision } = useDivisions();
 */
export function useDivisions(): UseDivisionsReturn {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("divisions")
      .select("*")
      .order("name");
    if (error) {
      setError(error.message);
    } else {
      setDivisions(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateDivision = useCallback(
    async (
      id: string,
      changes: Partial<Division>,
    ): Promise<{ error: string | null }> => {
      const doUpdate = async (payload: Record<string, any>) => {
        return supabase
          .from("divisions")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", id);
      };

      // Try the full update first
      let result = await doUpdate(changes);

      // If gallery_image_names column doesn't exist yet, retry without it
      if (
        result.error?.code === "PGRST204" ||
        result.error?.message?.includes("gallery_image_names")
      ) {
        const { gallery_image_names, ...safeChanges } = changes;
        result = await doUpdate(safeChanges);
      }

      if (result.error) return { error: result.error.message };
      // Optimistic local update
      setDivisions((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, ...changes, updated_at: new Date().toISOString() }
            : d,
        ),
      );
      return { error: null };
    },
    [],
  );

  return { divisions, loading, error, updateDivision, refetch: fetch };
}
