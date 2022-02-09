import { writable } from "svelte/store"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"

const customStore = () => {
    const isAuth = writable(false)
    let user = {}

    return {
        subscribe: isAuth.subscribe,
        checkisAuth: checkisAuth(result => isAuth.set(result)),
        signUp: (email, password) => createUserWithEmailAndPassword(email, password)
    }
}

const checkisAuth = (callback) => {
    let result = false
    // firebase

    callback(result)
}


export default customStore()