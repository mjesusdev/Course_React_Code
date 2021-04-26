import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDN8yNb-wF6n5ulTta6OIwnvs6GzUeogMU",
    authDomain: "react-app-cursos-b446e.firebaseapp.com",
    projectId: "react-app-cursos-b446e",
    storageBucket: "react-app-cursos-b446e.appspot.com",
    messagingSenderId: "516605645972",
    appId: "1:516605645972:web:10333910bcc6d85e579081"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}