import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABmI5tfHcX4RoD5fdZ17TgvtWlnCo9dYU',
  authDomain: 'nav-auto-care.firebaseapp.com',
  projectId: 'nav-auto-care',
  storageBucket: 'nav-auto-care.appspot.com',
  messagingSenderId: '900034495365',
  appId: '1:900034495365:web:785eedefdb45d2f99cfaec',
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth};
};
