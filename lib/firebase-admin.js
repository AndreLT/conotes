import admin from 'firebase-admin';

try{
    if (!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert({
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY,
                project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
            }),
            databaseURL: "https://conotes-f5b26.firebaseio.com"
        });
    }
}catch(error){
    console.log(error)
}

const auth = admin.auth();
const firestore = admin.firestore();

export {auth, firestore};