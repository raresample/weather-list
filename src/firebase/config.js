import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDXAFMcdaOz9fGiDu3sL-k3BkXSPju11XU",
  authDomain: "vue-weather-list.firebaseapp.com",
  projectId: "vue-weather-list",
  storageBucket: "vue-weather-list.appspot.com",
  messagingSenderId: "733151388829",
  appId: "1:733151388829:web:439d48a2d094a119da6074"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }