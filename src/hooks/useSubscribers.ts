import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Subscriber } from "../types/supabaseType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseSubscribersReturn {
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
  /**
   * Subscribe an email from the public newsletter form.
   * No auth required — matches the public INSERT policy.
   * Gracefully handles duplicate emails (already subscribed).
   */
  subscribe: (
    email: string,
  ) => Promise<{ error: string | null; alreadySubscribed?: boolean }>;
  /** Admin: remove a subscriber permanently. */
  removeSubscriber: (id: string) => Promise<{ error: string | null }>;
  /** Manually refetch the subscriber list (admin only — RLS blocks public reads). */
  refetch: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages newsletter subscribers.
 *
 * Public newsletter form: use only `subscribe()`.
 * Admin panel:            use the full hook to read and remove subscribers.
 *
 * @example
 * // Public newsletter signup
 * const { subscribe } = useSubscribers();
 * const { error, alreadySubscribed } = await subscribe(email);
 *
 * // Admin subscribers page
 * const { subscribers, loading, removeSubscriber } = useSubscribers();
 */
export function useSubscribers(): UseSubscribersReturn {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setSubscribers(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const subscribe = useCallback(
    async (
      email: string,
    ): Promise<{ error: string | null; alreadySubscribed?: boolean }> => {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        // Supabase throws a unique-violation error (code 23505) for duplicate emails
        if (error.code === "23505") {
          return { error: null, alreadySubscribed: true };
        }
        return { error: error.message };
      }
      return { error: null, alreadySubscribed: false };
    },
    [],
  );

  const removeSubscriber = useCallback(
    async (id: string): Promise<{ error: string | null }> => {
      const { error } = await supabase
        .from("subscribers")
        .delete()
        .eq("id", id);
      if (error) return { error: error.message };
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      return { error: null };
    },
    [],
  );

  return {
    subscribers,
    loading,
    error,
    subscribe,
    removeSubscriber,
    refetch: fetch,
  };
}
