import firebase from "firebase";

import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyDWa6GsRqIyIBRwiSuvIoVjWUhSxACa2_Y",
  authDomain: "asoata-aplicacion.firebaseapp.com",
  projectId: "asoata-aplicacion",
  storageBucket: "asoata-aplicacion.appspot.com",
  messagingSenderId: "79431592779",
  appId: "1:79431592779:web:da584db272033a205d16ce",
  measurementId: "G-3HW34PWV7D",
  storageBucket: "gs://asoata-aplicacion.appspot.com/",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   } else {
//     console.log("We are not authenticated now!");
//   }
// });

const db = firebase.firestore();
const storage = firebase.storage();

export default {
  firebase,
  db,
  storage,
};
