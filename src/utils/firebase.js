import firebase from 'firebase/app'
import 'firebase/analytics'
import('firebase/functions')

const firebaseConfig = {
  apiKey: 'AIzaSyDQWki_Z-ZZibF-xJ9ser7-JGlbvIwHcqs', 
  authDomain: 'gatehaus-6e1a0.firebaseapp.com',
  databaseURL: 'https://gatehaus-6e1a0-default-rtdb.asia-southeast1.firebasedatabase.app', 
  projectId: 'gatehaus-6e1a0',
  storageBucket: 'gatehaus-6e1a0.appspot.com',
  messagingSenderId: '744875153943',
  appId: '1:744875153943:web:26cbfe81cef75c62af5a52',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
