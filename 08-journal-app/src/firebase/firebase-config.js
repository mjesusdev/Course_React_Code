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

const firebaseConfigTesting = {
    apiKey: "AIzaSyCm8scFxNMmnSFh2XmfNKKBRIISAjnWb9g",
    authDomain: "redux-demo-c7476.firebaseapp.com",
    projectId: "redux-demo-c7476",
    storageBucket: "redux-demo-c7476.appspot.com",
    messagingSenderId: "517398209214",
    appId: "1:517398209214:web:dc734aabe764cc73aaf4ef"
};

if ( process.env.NODE_ENV === 'test' ) {
    // Database Testing
    firebase.initializeApp(firebaseConfigTesting);
} else {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}