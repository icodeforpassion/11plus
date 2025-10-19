import jsPDF from 'jspdf';

interface ParentSummaryPdf {
  childName: string;
  weekOf: string;
  accuracyByTopic: Array<{ topic: string; accuracy: number }>;
  minutesPractised: number;
  notes?: string;
}

export function buildParentSummaryPdf({ childName, weekOf, accuracyByTopic, minutesPractised, notes }: ParentSummaryPdf) {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ElevenSpark Weekly Summary', 14, 22);
  doc.setFontSize(12);
  doc.text(`Child: ${childName}`, 14, 32);
  doc.text(`Week commencing: ${weekOf}`, 14, 40);
  doc.text(`Minutes practised: ${minutesPractised}`, 14, 48);

  doc.text('Accuracy by topic:', 14, 60);
  accuracyByTopic.forEach((row, index) => {
    doc.text(`${row.topic}: ${row.accuracy}%`, 20, 70 + index * 8);
  });

  if (notes) {
    doc.text('Suggested next steps:', 14, 70 + accuracyByTopic.length * 8 + 10);
    doc.text(doc.splitTextToSize(notes, 180), 14, 70 + accuracyByTopic.length * 8 + 18);
  }

  return doc;
}
