import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminAuthContextType {
  /** The currently authenticated Supabase user, or null if not signed in. */
  user: User | null;
  /** The active session object (contains access_token, etc.). */
  session: Session | null;
  /** True while we are still resolving the initial session from storage. */
  loading: boolean;
  /** Sign in with email + password. Returns { error } string on failure. */
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  /** Sign out the current admin and clear the session. */
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

   
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (
    email: string,
    password: string,
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    // State is cleared by onAuthStateChange above — no need to call setUser/setSession here.
  }, []);

  return (
    <AdminAuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/** Must be used inside <AdminAuthProvider>. */
export const useAdminAuth = (): AdminAuthContextType => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
  return ctx;
};
