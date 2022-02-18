import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.SAPPER_APP_FIREBASE_API_KEY,
  authDomain: process.env.SAPPER_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.SAPPER_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.SAPPER_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.SAPPER_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.SAPPER_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)