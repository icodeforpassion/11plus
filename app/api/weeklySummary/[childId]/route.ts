import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth/server';
import { requireActiveSubscription } from '../../../../lib/auth/subscription';
import { initAdmin } from '../../../../firebase/admin';
import { startOfWeek, formatISO } from 'date-fns';

export async function GET(request: Request, { params }: { params: { childId: string } }) {
  try {
    const decoded = await requireAuth();
    await requireActiveSubscription(decoded.uid);
    const { childId } = params;
    const { db } = initAdmin();
    const childDoc = await db.collection('children').doc(childId).get();
    if (!childDoc.exists) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    const childData = childDoc.data() as any;
    if (childData.parentId && childData.parentId !== decoded.uid && childId !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const weekStart = formatISO(startOfWeek(new Date(), { weekStartsOn: 1 }), { representation: 'date' });
    const summaryRef = db.collection('weeklySummaries').doc(`${childId}:${weekStart}`);
    const summarySnap = await summaryRef.get();

    if (summarySnap.exists) {
      return NextResponse.json(summarySnap.data());
    }

    const attemptsSnap = await db
      .collection('attempts')
      .where('childId', '==', childId)
      .where('createdAt', '>=', weekStart)
      .get();

    const minutes = attemptsSnap.docs.reduce((acc, doc) => acc + (doc.data().timeTakenMs || 0), 0) / 60000;
    const accuracyByTopic: Record<string, { correct: number; total: number }> = {};
    attemptsSnap.forEach((doc) => {
      const data = doc.data();
      const key = data.topicKey;
      if (!accuracyByTopic[key]) accuracyByTopic[key] = { correct: 0, total: 0 };
      accuracyByTopic[key].total += 1;
      if (data.isCorrect) accuracyByTopic[key].correct += 1;
    });

    const summary = {
      childId,
      weekStartISO: weekStart,
      minutesPracticed: Math.round(minutes),
      accuracyByTopic: Object.fromEntries(
        Object.entries(accuracyByTopic).map(([topic, value]) => [topic, Math.round((value.correct / value.total) * 100) || 0])
      ),
      parentId: childData.parentId ?? null,
      generatedAt: new Date().toISOString()
    };

    await summaryRef.set(summary);
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unable to build summary' }, { status: error.message === 'Unauthorized' ? 401 : 400 });
  }
}
