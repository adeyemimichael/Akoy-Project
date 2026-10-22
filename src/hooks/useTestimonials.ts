import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Testimonial } from "../types/supabaseType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseTestimonialsOptions {
  /**
   * When true (default), only published testimonials are returned.
   * Pass false in admin pages to see all (including drafts).
   */
  publishedOnly?: boolean;
}

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  /** Add a new testimonial. Returns the created record or an error. */
  addTestimonial: (
    data: Omit<Testimonial, "id" | "created_at">,
  ) => Promise<{ data: Testimonial | null; error: string | null }>;
  /** Update any fields on an existing testimonial. */
  updateTestimonial: (
    id: string,
    changes: Partial<Testimonial>,
  ) => Promise<{ error: string | null }>;
  /** Flip the published flag on a testimonial. */
  togglePublished: (
    id: string,
    current: boolean,
  ) => Promise<{ error: string | null }>;
  /** Permanently delete a testimonial. */
  deleteTestimonial: (id: string) => Promise<{ error: string | null }>;
  /** Manually refetch. */
  refetch: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Fetches and manages testimonials.
 *
 * Public pages:  `useTestimonials()` — returns published only, ordered by sort_order.
 * Admin pages:   `useTestimonials({ publishedOnly: false })` — returns all records.
 *
 * @example
 * // Public
 * const { testimonials } = useTestimonials();
 *
 * // Admin
 * const { testimonials, addTestimonial, togglePublished, deleteTestimonial } =
 *   useTestimonials({ publishedOnly: false });
 */
export function useTestimonials({
  publishedOnly = true,
}: UseTestimonialsOptions = {}): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase
      .from("testimonials")
      .select("*")
      .order("sort_order")
      .order("created_at");
    if (publishedOnly) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) {
      setError(error.message);
    } else {
      setTestimonials(data ?? []);
    }
    setLoading(false);
  }, [publishedOnly]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const addTestimonial = useCallback(
    async (
      payload: Omit<Testimonial, "id" | "created_at">,
    ): Promise<{ data: Testimonial | null; error: string | null }> => {
      const { data, error } = await supabase
        .from("testimonials")
        .insert(payload)
        .select()
        .single();
      if (error) return { data: null, error: error.message };
      setTestimonials((prev) => [data, ...prev]);
      return { data, error: null };
    },
    [],
  );

  const updateTestimonial = useCallback(
    async (
      id: string,
      changes: Partial<Testimonial>,
    ): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("testimonials")
        .update(changes)
        .eq("id", id);
      if (error) return { error: error.message };
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
      );
      return { error: null };
    },
    [],
  );

  const togglePublished = useCallback(
    async (id: string, current: boolean): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("testimonials")
        .update({ published: !current })
        .eq("id", id);
      if (error) return { error: error.message };
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, published: !current } : t)),
      );
      return { error: null };
    },
    [],
  );

  const deleteTestimonial = useCallback(
    async (id: string): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) return { error: error.message };
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      return { error: null };
    },
    [],
  );

  return {
    testimonials,
    loading,
    error,
    addTestimonial,
    updateTestimonial,
    togglePublished,
    deleteTestimonial,
    refetch: fetch,
  };
}
