import firebase from './firebase'
import { useAuth } from './auth'
import fetcher from '../utils/fetcher';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  try {
    return firestore
      .collection('users')
      .doc(uid)
      .set({ uid, ...data, notes: 0 }, { merge: true })
  } catch (e) {
    console.log(e)
  }

}

export function updateUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ ...data }, { merge: true })
    .catch(e => console.log(e))
}

export async function deleteUser(uid) {
  const user = await firebase.auth().currentUser;
  const notes = await fetcher(`/api/notes`, user.token)
  console.log(notes)

  return user.delete().then((res) => {
    console.log(res)
    try {
      firestore
        .collection('users')
        .doc(uid)
        .delete()
        .then(() => {
          let snapshot = firestore
            .collection('notes')
            .where('userId', '==', uid)
            .get()

          snapshot.forEach((doc) => deleteNote(doc.id))
        })
    } catch (e) {
      console.log(e)
    }
  })
    .catch(e => console.log(e))
}

export function createNote(data) {
  try {
    return firestore
      .collection('notes')
      .doc()
      .set({ ...data }, { merge: true })
  } catch (e) {
    console.log(e)
  }
}

export function updateNote(id, data) {
  return firestore
    .collection('notes')
    .doc(id)
    .set({ ...data }, { merge: true })
    .catch(e => console.log(e))
}

export function deleteNote(id) {
  try {
    return firestore
      .collection('notes')
      .doc(id)
      .delete()
  } catch (e) {
    console.log(e)
  }
}