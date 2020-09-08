import firebase from './firebase'

const firestore = firebase.firestore();

export function createUser(uid, data){
    try{
        return firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...data}, {merge: true})
    }catch(e){
        console.log("EITA", e)
    }
    
}

export function createNote(data){
    return firestore
        .collection('notes')
        .add(data);
}
