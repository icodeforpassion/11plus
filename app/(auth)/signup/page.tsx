import { Metadata } from 'next';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { SignupForm } from '../../../components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Parent Sign Up | ElevenSpark',
  description: 'Create a parent account to manage your child’s 11+ practice.'
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-heading font-semibold text-text">Create your parent account</h1>
        <p className="mt-3 text-sm text-slate-600">
          Start a 7-day free trial, add your child, and begin confidence-building practice.
        </p>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
