import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBm13Rr9005AxbiolwtBbmQVF7Zjt5ULCA",
  authDomain: "happylinks-86657.firebaseapp.com",
  databaseURL: "https://happylinks-86657.firebaseio.com",
  projectId: "happylinks-86657",
  storageBucket: "happylinks-86657.appspot.com",
  messagingSenderId: "809660645083",
  appId: "1:809660645083:web:1da4b1ee8f9c544a8b16fe",
  measurementId: "G-VPGYN6462J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
