import { Metadata } from 'next';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { LoginForm } from '../../../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | ElevenSpark',
  description: 'Sign in to ElevenSpark to view dashboards and continue practice.'
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-heading font-semibold text-text">Sign in</h1>
        <p className="mt-3 text-sm text-slate-600">Welcome back! Continue building confidence with fresh practice.</p>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
