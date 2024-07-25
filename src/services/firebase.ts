import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' // se você estiver usando autenticação
import 'firebase/compat/database' // se você estiver usando o Firestore

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth() // se estiver usando autenticação
const db = firebase.database() // se estiver usando o Firestore

export { firebase, auth, db }
