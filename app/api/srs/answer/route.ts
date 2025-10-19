import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '../../../../lib/auth/server';
import { requireActiveSubscription } from '../../../../lib/auth/subscription';
import { initAdmin } from '../../../../firebase/admin';
import { reviewCard, initialCardState } from '../../../../lib/srs';

const schema = z.object({
  childId: z.string(),
  term: z.string(),
  quality: z.number().min(0).max(5)
});

export async function POST(request: Request) {
  try {
    const decoded = await requireAuth();
    await requireActiveSubscription(decoded.uid);
    const body = await request.json();
    const { childId, term, quality } = schema.parse(body);
    const { db } = initAdmin();
    const childDoc = await db.collection('children').doc(childId).get();
    if (!childDoc.exists) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    const childData = childDoc.data() as any;
    if (childData.parentId && childData.parentId !== decoded.uid && childId !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const cardRef = db.collection('srsCards').doc(`${childId}:${term}`);
    const snap = await cardRef.get();
    const state = snap.exists ? snap.data() : initialCardState();
    const updated = reviewCard(state, quality as any);
    await cardRef.set({ childId, term, ...updated });

    return NextResponse.json({ card: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update card' }, { status: error.message === 'Unauthorized' ? 401 : 400 });
  }
}
