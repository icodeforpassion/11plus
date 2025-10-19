'use client';

import { FormEvent, useState } from 'react';
import { initFirebase } from '../../firebase/init';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '../Button';

export function LoginForm() {
  const { auth } = initFirebase();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setLoading(true);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Welcome back! Head to your dashboard to continue building confidence.');
    } catch (error: any) {
      setMessage(error.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setMessage(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setMessage('Signed in with Google.');
    } catch (error: any) {
      setMessage(error.message ?? 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-text">
          Email address
        </label>
        <input id="email" name="email" type="email" required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
      <Button type="button" variant="secondary" onClick={handleGoogle} disabled={loading} className="w-full">
        Continue with Google
      </Button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
