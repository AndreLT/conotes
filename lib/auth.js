import React, { createContext, useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { useCookies } from 'react-cookie';

import fetcher from '../utils/fetcher';
import firebase from './firebase';
import { createUser, updateUser } from './firestore';

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
  const [cookie, setCookie, removeCookie] = useCookies(['auth']);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const nnotes = await fetcher(`/api/user/info`, user.token)

      const { token, ...userWithoutToken } = user;
      createUser(user.uid, { ...userWithoutToken });
      setUser({ notes: nnotes, ...user });
      setCookie('auth-conotes', true, {sameSite:"strict"});
      return user;
    } else {
      setUser(false);
      removeCookie('auth-conotes');
      return false
    }

  }

  const updateLocalInfo = (newInfo) => {
    const newUser = { ...user, ...newInfo }
    setUser(newUser)
  }

  const updateUserInfo = (data) => {
    return firebase
      .auth()
      .currentUser
      .updateProfile(data)
      .then(() => {
        updateUser(user.uid, data)
        updateLocalInfo(data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const resetPassword = (email) => {
    return firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => "success")
        .catch(e => e)
  }

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => { console.log(response.user); handleUser(response.user) })
  };

  const signup = (email, password, nickname) => {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if(response){
          response.user.updateProfile({ displayName: nickname })
          handleUser(response.user)
        }
      }).catch(function (error) {
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
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    updateLocalInfo,
    updateUserInfo,
    resetPassword,
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