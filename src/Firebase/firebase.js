import 'firebase/auth'
import 'firebase/firestore';
import firebase from "firebase";
const config = {
    apiKey: "AIzaSyCav-Te7CerT_AW3SKf3xJUZ-d3Npx0-jE",
    authDomain: "to-do-list-6cc17.firebaseapp.com",
    databaseURL: "https://to-do-list-6cc17.firebaseio.com",
    projectId: "to-do-list-6cc17",
    storageBucket: "",
    messagingSenderId: "550084424438",
    appId: "1:550084424438:web:3b5447e0ff310fa9"
  };
const firebaseApp = firebase.initializeApp(config);

export const fb=firebaseApp;
export const db= firebaseApp.firestore();
export const auth =firebaseApp.auth(); 