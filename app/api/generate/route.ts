import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '../../../lib/auth/server';
import { requireActiveSubscription } from '../../../lib/auth/subscription';
import { rateLimit } from '../../../lib/rateLimiter';
import { templates } from '../../../lib/generators';
import { hashString, mulberry32 } from '../../../lib/rng';
import { initAdmin } from '../../../firebase/admin';

const schema = z.object({
  childId: z.string(),
  subject: z.enum(['maths', 'english']),
  topicKey: z.string().optional(),
  count: z.number().min(1).max(20)
});

export async function POST(request: Request) {
  try {
    const decoded = await requireAuth();
    if (!rateLimit(`generate:${decoded.uid}`, 10, 60_000)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    await requireActiveSubscription(decoded.uid);
    const { db } = initAdmin();

    const body = await request.json();
    const { childId, subject, topicKey, count } = schema.parse(body);
    const childDoc = await db.collection('children').doc(childId).get();
    if (!childDoc.exists) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    const childData = childDoc.data() as any;
    if (childData.parentId && childData.parentId !== decoded.uid && childId !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const daySeed = hashString(`${childId}-${topicKey ?? 'all'}-${new Date().toDateString()}`);
    const salt = mulberry32(daySeed)();
    const selected = templates.filter((template) => template.id.startsWith(`${subject}.`) && (!topicKey || template.topicKey === topicKey));
    if (!selected.length) {
      return NextResponse.json({ error: 'No templates available' }, { status: 404 });
    }
    const questions = Array.from({ length: count }, (_, index) => {
      const template = selected[index % selected.length];
      const seed = Math.floor((salt + index) * 1000);
      const generated = template.generate(seed);
      return {
        templateId: template.id,
        seed,
        stem: generated.stem,
        choices: generated.choices,
        canonicalAnswer: generated.canonicalAnswer,
        explanation: generated.explanation,
        difficulty: generated.difficulty
      };
    });
    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to generate questions' }, { status: error.message === 'Unauthorized' ? 401 : 400 });
  }
}
