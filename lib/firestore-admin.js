import { compareDesc, parseISO } from 'date-fns'

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

  notes.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { notes };
}

export async function getNote(noteId){
  const doc = await firestore
    .collection('notes')
    .doc(noteId)
    .get();

  const note = {id:doc.id, ...doc.data()}

  return {note};
}