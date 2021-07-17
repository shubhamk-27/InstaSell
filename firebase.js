import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJAKOz7w1uSBHaDWJynot-7VibvB6P0mM",
  authDomain: "instasell-227bf.firebaseapp.com",
  projectId: "instasell-227bf",
  storageBucket: "instasell-227bf.appspot.com",
  messagingSenderId: "489187868494",
  appId: "1:489187868494:web:88c791eb405cc559aea81f",
  measurementId: "G-CN0GSZ9SZS",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
