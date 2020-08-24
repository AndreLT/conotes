import React, {createContext, useContext, useState} from 'react';
import firebase from './firebase';
import {createUser} from './firestore';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const handleUser = (rawUser) => {
        if(rawUser){
            const user = formatUser(rawUser)
            
            createUser(user.uid, user);
            setUser(user);
            return user;
        }else{
            setUser(false);
            return false
        }

    }


    const signin = (email,password) => {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);

            console.log(error);
        })
        .then((response) => handleUser(response.user))
    };

    const signup = (email, password) => {
        return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
        })
        .then((response) => handleUser(response.user));
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };

    return {
        user,
        signin,
        signup,
        signout
    };
}

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email
    }
}


