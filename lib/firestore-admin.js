import { firestore } from './firebase-admin'

export async function getUserNotes(userId){
  const snapshot = await firestore
    .collection('notes')
    .where('userId', '==', userId)
    .get();

  const notes = [];

  snapshot.forEach((doc) => {
    notes.push({ id:doc.id, ...doc.data() })
    });

  return { notes };
}

export async function getNote(noteId){
  const note = await db
    .collection('notes')
    .where('id', '==', noteId)
    .get();

  res.status(200).json({note});
}