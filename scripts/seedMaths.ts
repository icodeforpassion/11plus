import { mathsTemplates } from '../lib/generators/maths';
import { englishTemplates } from '../lib/generators/english';
import { initAdmin } from '../firebase/admin';

async function seedTemplates() {
  const { db } = initAdmin();
  const batch = db.batch();
  mathsTemplates.forEach((template) => {
    batch.set(db.collection('questionTemplates').doc(template.id), {
      id: template.id,
      subject: 'maths',
      topicKey: template.topicKey,
      templateType: template.templateType,
      difficulty: template.difficulty,
      generatorFnKey: template.id,
      paramsSchema: {}
    });
  });
  englishTemplates.forEach((template) => {
    batch.set(db.collection('questionTemplates').doc(template.id), {
      id: template.id,
      subject: 'english',
      topicKey: template.topicKey,
      templateType: template.templateType,
      difficulty: template.difficulty,
      generatorFnKey: template.id,
      paramsSchema: {}
    });
  });
  await batch.commit();
  console.log(`Seeded ${mathsTemplates.length + englishTemplates.length} templates`);
}

seedTemplates().catch((error) => {
  console.error(error);
  process.exit(1);
});
