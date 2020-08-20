import React, {createContext, useContext, useState} from 'react';
import firebase from './firebase';

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

    console.log(user)

    const signin = (email,password) => {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            setUser(response.user);
            return response.user;
        })
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
        .then((response) => {
            setUser(response.user);
            return response.user;
        });
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
    }
}


