// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQQMoXKVh-QtvamqGCqyQ2sfglqpWj7b4",
    authDomain: "todo-vue-firebase-762cf.firebaseapp.com",
    projectId: "todo-vue-firebase-762cf",
    storageBucket: "todo-vue-firebase-762cf.appspot.com",
    messagingSenderId: "783972625424",
    appId: "1:783972625424:web:779f4205c22a2c3072ae95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}