import { initAdmin } from '../../firebase/admin';

export async function requireActiveSubscription(userId: string) {
  const { db } = initAdmin();
  const snap = await db.collection('subscriptions').doc(userId).get();
  if (!snap.exists) {
    throw new Error('Subscription required');
  }
  const data = snap.data();
  if (!data) {
    throw new Error('Subscription required');
  }
  if (!['active', 'trialing'].includes(data.status)) {
    throw new Error('Subscription inactive');
  }
  return data;
}
