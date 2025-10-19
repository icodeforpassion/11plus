import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { initAdmin } from '../../../../firebase/admin';

const SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

function verifySignature(body: string, signature: string | null) {
  if (!SECRET || !signature) return false;
  const digest = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('X-Signature');
  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const { db } = initAdmin();
  const userId = event.meta?.custom_data?.userId;
  if (!userId) {
    return NextResponse.json({ error: 'Missing user reference' }, { status: 400 });
  }

  const status = event.data?.attributes?.status || 'pending';
  const plan = event.data?.attributes?.variant_name?.toLowerCase().includes('family') ? 'family' : 'starter';
  const currentPeriodEnd = event.data?.attributes?.renews_at;

  await db.collection('subscriptions').doc(userId).set(
    {
      userId,
      provider: 'lemonsqueezy',
      plan,
      status,
      currentPeriodEnd,
      customerId: event.data?.attributes?.customer_id
    },
    { merge: true }
  );

  return NextResponse.json({ received: true });
}
