import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Notiflix from 'notiflix';
import { onAuthStateChanged } from 'firebase/auth';
import modalAuth from './modalAuth';
import closeModalAuth from './closeModalAuth';
import blackThemeLogin from '../blackTheme/blackThemeLogin';
//import getModalData from './FireBase/getModalData';

import getModalData from './getModalData';
import onClickStateUser from './onClickStateUSer';
let uid = '';

const firebaseConfig = {
  apiKey: 'AIzaSyA0Jg3owd7CYZ_lII5XL2NnspjHhLrMIPQ',
  authDomain: 'filmoteka-it-people.firebaseapp.com',
  projectId: 'filmoteka-it-people',
  storageBucket: 'filmoteka-it-people.appspot.com',
  messagingSenderId: '809306812153',
  appId: '1:809306812153:web:98a43635dcd9e66607fc28',
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function onClickSingIn() {
  modalWindow.innerHTML = modalAuth('Login', 'Sign in');
  const form = document.querySelector('.login-form');
  const login__cls = document.querySelector('.modal__cross--reg');
  blackThemeLogin();

  login__cls.addEventListener('click', () => {
    modalWindow.innerHTML = '';
  });
  closeModalAuth();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = getModalData(e);

    if (!user) {
      return;
    }
    

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;

        modalWindow.innerHTML = '';

        onAuthStateChanged(auth, user => {
          if (user) {
            uid = user.uid;
            onClickStateUser();
          } else {
            // User is signed out
            // ...
          }
        });
        // ...
      })
      .catch(error => {
        Notiflix.Notify.warning('Something is wrong. Please try again');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
}
