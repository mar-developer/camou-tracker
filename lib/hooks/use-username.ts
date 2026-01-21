'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { RESERVED_USERNAMES, generateUsernameSuggestions } from '@/lib/social/username';
import { validateUsername as validateUsernameUtil } from '@/lib/social/username';

export function useUsername() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUsername = async (username: string): Promise<boolean> => {
    setError(null);
    setChecking(true);

    const validation = await validateUsernameUtil(username, async (username) => {
      const { data } = await supabase
        .from('auth.users')
        .select('username')
        .eq('username', username)
        .single();
      
      return !!data;
    });

    setChecking(false);

    if (!validation.valid) {
      setError(validation.error || 'Invalid username');
      setAvailable(false);
      return false;
    }

    setAvailable(true);
    return true;
  };

  const checkAvailability = async (username: string): Promise<boolean> => {
    setChecking(true);
    setError(null);

    const { data, error } = await supabase
      .from('auth.users')
      .select('username')
      .eq('username', username)
      .single();

    setChecking(false);

    if (error) {
      setAvailable(true); // Not taken (error means not found)
      return true;
    }

    setAvailable(false); // Taken
    return false;
  };

  const updateUsername = async (userId: string, newUsername: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);

    const validation = await validateUsernameUtil(newUsername, async (username) => {
      const { data } = await supabase
        .from('auth.users')
        .select('username')
        .eq('username', username)
        .neq('id', userId)
        .single();
      
      return !!data;
    });

    if (!validation.valid) {
      setError(validation.error || 'Invalid username');
      return { success: false, error: validation.error };
    }

    const { error: updateError } = await supabase.rpc('update_user_username', {
      user_uuid: userId,
      new_username: newUsername,
    });

    if (updateError) {
      setError('Failed to update username');
      return { success: false, error: updateError.message };
    }

    return { success: true };
  };

  const getUsernameSuggestions = (baseName: string): string[] => {
    return generateUsernameSuggestions(baseName);
  };

  return {
    available,
    checking,
    error,
    validateUsername,
    checkAvailability,
    updateUsername,
    getUsernameSuggestions,
  };
}
