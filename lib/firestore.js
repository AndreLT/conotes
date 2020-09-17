import firebase from './firebase'

const firestore = firebase.firestore();

export function createUser(uid, data){
    try{

        return firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...data, notes: 0}, {merge: true})
    }catch(e){
        console.log(e)
    }
    
}

export function createNote(data){
    try{
        return firestore
            .collection('notes')
            .doc()
            .set({...data}, {merge: true})
    }catch(e){
        console.log(e)
    }
}
