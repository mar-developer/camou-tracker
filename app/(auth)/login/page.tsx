'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/use-auth';
import { Flame, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await signIn(email, password);

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
    } else if (data?.session) {
      router.push('/dashboard');
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setError(null);
    const { data, error: oAuthError } = await signInWithOAuth(provider);

    if (oAuthError) {
      setError(oAuthError.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flame className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to continue to HabitTracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 2.65V22h5.11c.78-2.15 1.51-3.92 1.63-5.53H12v-8.26h3.28z"
                  fill="currentColor"
                />
                <path
                  d="M12 7.93V4.26h-1.28c-2.5 0-3.78 1.4-3.78 3.67h3.53v-1.56H9.28C9.28 1.56 8.22 4.09 8.22 7.93h2.6V12h-2.6v6.67h2.6c.78-2.15 1.51-3.92 1.63-5.53h-1.78c.78 2.15 1.51 3.92 1.63 5.53z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('github')}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261 1.566-.807 2.165-.526 1.602-1.588 2.206-2.716-.641-.275-.945-.762-1.488-.775-.558-.002-1.135-.064-1.655-.075-.668-.102-1.335-.204-2.056-.427-1.695-1.076-2.743-1.714-1.605.514-2.658 1.354-2.658 3.053 0 1.59.582 3.234 1.678 4.395zm4.361 13.281c-1.261.933-2.825 1.532-4.736.605-2.044-.817-4.362-.817-6.865 0-3.096 1.905-5.786 4.78-7.605.928-.558 1.602-1.367 2.22-2.056-.695-.275-.945-.762-1.488-.775-.558-.006-1.135-.064-1.655-.075-.668-.102-1.335-.204-2.056-.427-1.695-1.076-2.743-1.714-1.605.514-2.658 1.354-2.658 3.053 0 1.59.582 3.234 1.678 4.395z" />
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
