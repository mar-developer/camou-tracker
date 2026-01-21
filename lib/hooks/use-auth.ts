'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser & {
  username?: string;
  avatar_color?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser && mounted) {
        const { data: userData } = await supabase
          .from('auth.users')
          .select('username, avatar_color')
          .eq('id', authUser.id)
          .single();
        
        setUser({
          ...authUser,
          username: userData?.username,
          avatar_color: userData?.avatar_color,
        });
      }
      
      setLoading(false);
    }

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user && mounted) {
          const { data: userData } = await supabase
            .from('auth.users')
            .select('username, avatar_color')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            ...session.user,
            username: userData?.username,
            avatar_color: userData?.avatar_color,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { data, error };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  }, []);

  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
  };
}
