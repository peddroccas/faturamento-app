import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // se você estiver usando autenticação
import "firebase/compat/firestore"; // se você estiver usando o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAYzifqO28DjM2G4xvI0BfEbdL77koBbmo",
  authDomain: "drogaria-sao-rafael.firebaseapp.com",
  projectId: "drogaria-sao-rafael",
  storageBucket: "drogaria-sao-rafael.appspot.com",
  messagingSenderId: "167490251906",
  appId: "1:167490251906:web:4113eee67e73576375989b",
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // se estiver usando autenticação
const firestore = firebase.firestore(); // se estiver usando o Firestore

export { firebase, auth, firestore };