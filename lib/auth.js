import React, {createContext, useContext, useState, useEffect} from 'react';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import fetcher from '../utils/fetcher';
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
    const [cookie, setCookie] = useCookies(['auth']);

    const handleUser = async (rawUser) => {
        if(rawUser){
            const user = await formatUser(rawUser);
            const nnotes = await fetcher(`/api/user/info`,user.token)

            const {token, ...userWithoutToken} = user;
            createUser(user.uid, {...userWithoutToken});
            setUser({notes: nnotes, ...user});
            setCookie('auth', true);
            return user;
        }else{
            setUser(false);
            setCookie('auth', false);
            return false
        }

    }

    const signin = (email,password) => {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => handleUser(response.user))
    };

    const signup = (email, password, nickname) => {
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
            response.user.updateProfile({displayName: nickname})
            handleUser(response.user)
        });
    };

    const signout = () => {

        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
                Router.push('/');
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

        return () => unsubscribe();
    }, []);

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
        email: rawUser.email,
        token: rawUser.xa,
        displayName: rawUser.displayName
    }
}