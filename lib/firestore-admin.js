import { firestore } from './firebase-admin'

export async function getUserNotes(userId, last, limit){

  let options = firestore
    .collection('notes')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')

  if(last){
    const doc = await firestore.collection('notes').doc(last).get()
    options = options.startAfter(doc)
  }

  const snapshot = await options
    .limit(limit)
    .get();

  const notes = [];

  snapshot.forEach((doc) => {
    notes.push({ id:doc.id, ...doc.data() })
  });
    
  return(notes)
}

export async function getTotalNotes(userId){
  const snapshot = await firestore
    .collection('notes')
    .where('userId', '==', userId).get()
  return snapshot.size
}

export async function getUserInfo(id){
  const doc = await firestore.collection('users').doc(id).get();
  const info = {uid: doc.uid, ...doc.data()}

  return {info}
}


export async function getNote(noteId){
  const doc = await firestore
    .collection('notes')
    .doc(noteId)
    .get();

  const note = {id:doc.id, ...doc.data()}
  

  return {note};
}