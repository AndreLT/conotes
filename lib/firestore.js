import firebase from './firebase'
import {useAuth} from './auth'

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

export function deleteNote(id){
    try{
        return firestore
            .collection('notes')
            .doc(id)
            .delete()
    }catch(e){
        console.log(e)
    }
}