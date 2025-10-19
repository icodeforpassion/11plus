import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '../../../lib/auth/server';
import { requireActiveSubscription } from '../../../lib/auth/subscription';
import { rateLimit } from '../../../lib/rateLimiter';
import { initAdmin } from '../../../firebase/admin';
import { updateElo } from '../../../lib/elo';
import { reviewCard, initialCardState } from '../../../lib/srs';

const schema = z.object({
  childId: z.string(),
  generatedQuestionId: z.string(),
  templateId: z.string(),
  subject: z.enum(['maths', 'english']),
  seed: z.number(),
  topicKey: z.string(),
  difficulty: z.number().min(1).max(5),
  isCorrect: z.boolean(),
  userAnswer: z.string(),
  timeTakenMs: z.number().min(0),
  srsTerm: z.string().optional(),
  srsQuality: z.number().min(0).max(5).optional()
});

export async function POST(request: Request) {
  try {
    const decoded = await requireAuth();
    if (!rateLimit(`submit:${decoded.uid}`, 30, 60_000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    await requireActiveSubscription(decoded.uid);
    const body = await request.json();
    const payload = schema.parse(body);
    const { db } = initAdmin();
    const childDoc = await db.collection('children').doc(payload.childId).get();
    if (!childDoc.exists) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    const childData = childDoc.data() as any;
    if (childData.parentId && childData.parentId !== decoded.uid && payload.childId !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const attemptRef = db.collection('attempts').doc();
    await attemptRef.set({
      ...payload,
      parentId: childData.parentId ?? null,
      createdAt: new Date().toISOString()
    });

    const skillRef = db.collection('skills').doc(`${payload.childId}:${payload.topicKey}`);
    const skillSnap = await skillRef.get();
    const currentTheta = skillSnap.exists ? skillSnap.data()?.theta ?? 1200 : 1200;
    const updatedTheta = updateElo(currentTheta, payload.difficulty, payload.isCorrect);
    await skillRef.set(
      {
        childId: payload.childId,
        topicKey: payload.topicKey,
        subject: payload.subject,
        parentId: childData.parentId ?? null,
        theta: updatedTheta,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );

    if (payload.srsTerm && typeof payload.srsQuality === 'number') {
      const cardRef = db.collection('srsCards').doc(`${payload.childId}:${payload.srsTerm}`);
      const cardSnap = await cardRef.get();
      const state = cardSnap.exists ? cardSnap.data() : initialCardState();
      const updated = reviewCard(state, payload.srsQuality as any);
      await cardRef.set({
        childId: payload.childId,
        term: payload.srsTerm,
        parentId: childData.parentId ?? null,
        ...updated
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to submit attempt' }, { status: error.message === 'Unauthorized' ? 401 : 400 });
  }
}
