import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Inquiry } from "../types/supabaseType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseInquiriesReturn {
  inquiries: Inquiry[];
  loading: boolean;
  error: string | null;
  /**
   * Submit a new inquiry from the public contact form.
   * No auth required — matches the public INSERT policy.
   */
  submitInquiry: (
    data: Omit<Inquiry, "id" | "status" | "created_at">,
  ) => Promise<{ error: string | null }>;
  /** Admin: update the status of an inquiry. */
  updateStatus: (
    id: string,
    status: Inquiry["status"],
  ) => Promise<{ error: string | null }>;
  /** Admin: permanently delete an inquiry. */
  deleteInquiry: (id: string) => Promise<{ error: string | null }>;
  /** Manually refetch all inquiries (admin only — public SELECT is blocked by RLS). */
  refetch: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages contact-form inquiries.
 *
 * Public contact form: use only `submitInquiry()`.
 * Admin panel:         use the full hook to read, update status, and delete.
 *
 * @example
 * // Public contact form
 * const { submitInquiry } = useInquiries();
 * await submitInquiry({ full_name, email, phone, country, division, message });
 *
 * // Admin inquiries page
 * const { inquiries, loading, updateStatus, deleteInquiry } = useInquiries();
 */
export function useInquiries(): UseInquiriesReturn {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setInquiries(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const submitInquiry = useCallback(
    async (
      data: Omit<Inquiry, "id" | "status" | "created_at">,
    ): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("inquiries")
        .insert({ ...data, status: "unread" });
      if (error) return { error: error.message };
      return { error: null };
    },
    [],
  );

  const updateStatus = useCallback(
    async (
      id: string,
      status: Inquiry["status"],
    ): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);
      if (error) return { error: error.message };
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i)),
      );
      return { error: null };
    },
    [],
  );

  const deleteInquiry = useCallback(
    async (id: string): Promise<{ error: string | null }> => {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) return { error: error.message };
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      return { error: null };
    },
    [],
  );

  return {
    inquiries,
    loading,
    error,
    submitInquiry,
    updateStatus,
    deleteInquiry,
    refetch: fetch,
  };
}
