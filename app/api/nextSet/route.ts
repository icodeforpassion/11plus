import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '../../../lib/auth/server';
import { requireActiveSubscription } from '../../../lib/auth/subscription';
import { rateLimit } from '../../../lib/rateLimiter';
import { initAdmin } from '../../../firebase/admin';
import { selectNextTopics } from '../../../lib/adaptive';

const schema = z.object({
  childId: z.string(),
  subject: z.enum(['maths', 'english']),
  count: z.number().min(1).max(10)
});

export async function POST(request: Request) {
  try {
    const decoded = await requireAuth();
    if (!rateLimit(`next:${decoded.uid}`, 20, 60_000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    await requireActiveSubscription(decoded.uid);

    const body = await request.json();
    const { childId, subject, count } = schema.parse(body);
    const { db } = initAdmin();
    const childDoc = await db.collection('children').doc(childId).get();
    if (!childDoc.exists) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    const childData = childDoc.data() as any;
    if (childData.parentId && childData.parentId !== decoded.uid && childId !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const skillsSnap = await db
      .collection('skills')
      .where('childId', '==', childId)
      .where('subject', '==', subject)
      .get();

    const skills = skillsSnap.docs.map((doc) => ({
      ...(doc.data() as any)
    }));

    const selection = selectNextTopics(skills, count, Date.now(), subject);
    return NextResponse.json({ topics: selection });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to compute next set' }, { status: error.message === 'Unauthorized' ? 401 : 400 });
  }
}
