import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // for authentication
import "firebase/compat/storage"; // for storage
import "firebase/compat/database"; // for realtime database
import "firebase/compat/firestore"; // for cloud firestore

const firebaseConfig = {
  apiKey: "AIzaSyDHccQ8W02e1t-r6GrJxFNs4ikT0GS3brI",
  authDomain: "messaging-app-mern-c966a.firebaseapp.com",
  projectId: "messaging-app-mern-c966a",
  storageBucket: "messaging-app-mern-c966a.appspot.com",
  messagingSenderId: "741622845644",
  appId: "1:741622845644:web:295ed606ff7c4675e5b269",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
