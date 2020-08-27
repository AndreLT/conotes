import firebase from './firebase'

const firestore = firebase.firestore();

export function createUser(uid, data){
    return firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...data}, {merge: true})
}

export function createNote(uid, data){
    return firestore
        .collection('notes')
        .doc()
        .set({uid, ...data}, {merge: true})
}

export function getNotes(uid){
    return firestore
        .collection('notes')
        .where("uid", "==", uid)
}