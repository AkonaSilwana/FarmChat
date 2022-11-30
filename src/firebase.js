// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGJ0T9YMeiNpCoJ-pPBeaeQ-pE5cbb6iM",
  authDomain: "farm-assignment.firebaseapp.com",
  projectId: "farm-assignment",
  storageBucket: "farm-assignment.appspot.com",
  messagingSenderId: "633519811834",
  appId: "1:633519811834:web:afe23671ba955f6eda2d43",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db, storage };