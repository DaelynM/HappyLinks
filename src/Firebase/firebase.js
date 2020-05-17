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

// export const updateUsername = async (authParam, extraParam) => {
//   if (authParam == null) {
//     return;
//   }
//   const userReference = firestore.doc(`/users/${authParam.uid}`);
//   //this is will give us the firebase snaphot object that tells if the user already exisits and their uid again
//   const snapShot = await userReference.get();
//   //logs that snapshot here
//   console.log("Snapshot here", snapShot);
// };

export const createProfileDoc = async (authParam, extraParam) => {
  //take the userObj and checks if were signed in
  if (authParam == null) {
    return;
  }
  //loggs the uid of the user
  // console.log("auth", authParam.uid);
  //userReference will get the collection of the user with the uid / sign in user
  const userReference = firestore.doc(`/users/${authParam.uid}`);
  //this is will give us the firebase snaphot object that tells if the user already exisits and their uid again
  const snapShot = await userReference.get();
  //logs that snapshot here
  console.log("Snapshot here", snapShot);

  //if the user does not exisit, we will create one here
  if (snapShot.exists === false) {
    const email = authParam.email;
    const displayName = authParam.displayName;
    const createdAt = new Date();
    const founderAward = "Founder Award";
    const username = null;
    const firstName = null;
    const lastName = null;

    const sendInfoToFirebase = async () => {
      let response = await fetch("https://api.ipify.org?format=json");
      await response.json().then((e) => {
        const signUpIp = e.ip;
        try {
          userReference.set({
            displayName,
            firstName,
            lastName,
            email,
            createdAt,
            signUpIp,
            founderAward,
            username,
            ...extraParam,
          });
        } catch (err) {
          console.log("error creating user", err.message);
        }
      });
    };

    sendInfoToFirebase();
  } else {
    const lastOnline = authParam.metadata.lastSignInTime;
    await userReference.update({ lastOnline });
  }

  return userReference; //just incase we want to do other stuff with it
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); //used to query documents

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
