import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount: ServiceAccount | undefined = process.env.FIREBASE_ADMIN_CREDENTIALS
  ? JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
  : undefined;

export function initAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: serviceAccount ? cert(serviceAccount) : undefined,
      projectId: serviceAccount?.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
  }
  return { auth: getAuth(), db: getFirestore() };
}
