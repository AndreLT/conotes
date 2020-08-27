import db from '../../lib/firebase-admin'

export default async (_, res) => {
  const snapshot = await db.collection('notes').get();
  const notes = [];

  snapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({notes});
}
