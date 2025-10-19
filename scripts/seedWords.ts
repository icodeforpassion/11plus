import { WORD_BANK } from '../lib/generators/english/wordBank';
import { initAdmin } from '../firebase/admin';

async function seed() {
  const { db } = initAdmin();
  const batch = db.batch();
  WORD_BANK.forEach((entry) => {
    const ref = db.collection('vocabulary').doc(entry.word);
    batch.set(ref, entry);
  });
  await batch.commit();
  console.log(`Seeded ${WORD_BANK.length} words`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
