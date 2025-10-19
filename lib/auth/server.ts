import { headers } from 'next/headers';
import { initAdmin } from '../../firebase/admin';

export async function requireAuth() {
  const hdrs = headers();
  const authHeader = hdrs.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.replace('Bearer ', '');
  const { auth } = initAdmin();
  const decoded = await auth.verifyIdToken(token);
  return decoded;
}
