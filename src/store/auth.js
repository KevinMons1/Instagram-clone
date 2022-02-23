import { writable } from "svelte/store"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase-config"
import { getCurrentUser } from "../firebase/user"

const customStore = () => {
    const isAuth = writable(null)

    return {
        subscribe: isAuth.subscribe,
        signUp: (email, password) => {
            return createUserWithEmailAndPassword(auth, email, password)
        },
        signIn: (email, password) => {
            return signInWithEmailAndPassword(auth, email, password)
        },
        signOut: () => auth.signOut(),
        currentUser: () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const data = await getCurrentUser(user.uid)
                    isAuth.set({
                        uid: user.uid,
                        ...data
                    })
                } else isAuth.set(false)
            })
        }
    }
}

const store = customStore()

export default store