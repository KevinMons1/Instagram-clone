import { writable } from "svelte/store"

const customStore = () => {
    const isAuth = writable(false)
    return {
        subscribe: isAuth.subscribe,
        checkisAuth: checkisAuth(result => isAuth.set(result))
    }
}

const checkisAuth = (callback) => {
    let result = false
    // firebase

    callback(result)
}

export default customStore()