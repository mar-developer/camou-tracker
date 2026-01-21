'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUsername } from '@/lib/hooks/use-username';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Flame, ArrowLeft, Check, X, RefreshCw } from 'lucide-react';

export default function UsernamePage() {
  const router = useRouter();
  const {
    available,
    checking,
    validateUsername,
    checkAvailability,
    updateUsername,
    getUsernameSuggestions,
  } = useUsername();

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        router.push('/login');
      }
    }
    getCurrentUser();
  }, [router]);

  const handleUsernameChange = async (value: string) => {
    setUsername(value.toLowerCase().replace(/[^a-z0-9_]/g, '').substring(0, 20));

    if (value.length >= 3) {
      await validateUsername(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) return;
    if (!available) {
      return;
    }

    setLoading(true);
    const { success, error: updateError } = await updateUsername(userId, username);
    setLoading(false);

    if (success) {
      router.push('/dashboard');
    } else if (updateError) {
      setUpdateError(updateError);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleGetSuggestions = () => {
    const email = username || 'user';
    const suggestions = getUsernameSuggestions(email);
    setUsername(suggestions[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="mb-2"
            title="Skip for now"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flame className="h-10 w-10" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Choose your username</CardTitle>
          <CardDescription className="text-center">
            Your username will be your public profile URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            {username && <UserAvatar username={username} size={80} />}
            {!username && <UserAvatar username="you" size={80} />}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <UserAvatar username={username || 'you'} size={40} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="pl-14"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                  disabled={checking}
                />
                {username && (
                  <button
                    type="button"
                    onClick={handleGetSuggestions}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    title="Get suggestions"
                  >
                    <RefreshCw className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </div>

              {username && !checking && (
                <div className="flex items-center mt-2 text-sm">
                  {available === null ? (
                    <span className="text-muted-foreground">
                      Type to check availability
                    </span>
                  ) : available === true ? (
                    <span className="flex items-center text-success">
                      <Check className="h-4 w-4 mr-1" />
                      Username is available!
                    </span>
                  ) : (
                    <span className="flex items-center text-destructive">
                      <X className="h-4 w-4 mr-1" />
                      Username is taken
                    </span>
                  )}
                </div>
              )}

              {updateError && (
                <div className="mt-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {updateError}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !available || checking}
            >
              {loading ? 'Saving...' : 'Continue'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Username rules
              </span>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>3-20 characters long</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Letters, numbers, and underscores only</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Cannot be changed later</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Will be part of your profile URL</span>
            </li>
          </ul>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            <button
              type="button"
              onClick={handleSkip}
              className="text-primary font-medium hover:underline"
            >
              Skip for now
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
