import { doc, getDoc, getDocs, query, collection, where, limit, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "./firebase-config"
import { v4 as uuid } from "uuid"
import { getCurrentUser } from "./user"

// ---- GET ----
export const getInbox = async (uid) => {
    const messagesRef = await collection(db, "messages")
    const queryMessages1 = await query(messagesRef, where("uid1", "==", uid))
    const queryMessages2 = await query(messagesRef, where("uid2", "==", uid))
    const messages1 = await getDocs(queryMessages1)
    const messages2 = await getDocs(queryMessages2)
    let data = []

    messages1.forEach(async element => {
        data.push({
            messages: element.data().messages[0].items[element.data().messages[0].items.length - 1],
            uid: element.data().uid2,
            roomId: element.id
        })
    })

    messages2.forEach(async element => {
        data.push({
            messages: element.data().messages[0].items[element.data().messages[0].items.length - 1],
            uid: element.data().uid1,
            roomId: element.id
        })
    })

    for (let i = 0; i < data.length; i++) {
        const userData = await getCurrentUser(data[i].uid)
        data[i] = {
            messages: data[i].messages,
            roomId: data[i].roomId,
            ...userData
        }
    }

    return data
}

export const getNewMessage = async (value, uid) => {
    value = value.toLowerCase()
    let queryUser
    let result = []
    let strFront = value.slice(0, value.length - 1)
    let strEnd = value.slice(value.length - 1, value.length)
    let strCut = strFront + String.fromCharCode(strEnd.charCodeAt(0) + 1)

    const userRef = await collection(db, "users")

    if (value !== "") {
        queryUser = await query(userRef, where("username", ">=", value), where("username", "<", strCut), limit(10))
    } else {
        queryUser = await query(userRef, where("username", ">=", value), limit(10))
    }

    const users = await getDocs(queryUser)

    users.forEach(async element => {
        if (element.id !== uid) {
            result.push({
                ...element.data(),
                uid: element.id
            })
        }
    })

    return result
}

export const getRoom = async (uid, roomId, addData) => {
    const messagesRef = await doc(db, "messages", roomId)

    const snpashot = await onSnapshot(messagesRef, message => {
        addData(message.data().messages[0].items)
    })

    // Get informations user
    const message = await getDoc(messagesRef)
    const messageData = message.data()
    let dataUser = {}

    if (messageData.uid1 !== uid) {
        dataUser = await getCurrentUser(messageData.uid1)
    } else if (messageData.uid2 !== uid) {
        dataUser = await getCurrentUser(messageData.uid2)
    }

    return dataUser
}

// ---- POST ----
export const addRoom = async (uid, friendId) => {
    const messagesRef = await collection(db, "messages")
    const queryMessages = await query(messagesRef, where("uid1", "in", [uid, friendId]))
    let id = ""
    let isExist = false
    let data = {}

    // Check if exist
    const messages = await getDocs(queryMessages)

    messages.forEach(element => {
        const elementData = element.data()
        if ((elementData.uid1 === uid && elementData.uid2 === friendId) || (elementData.uid1 === friendId && elementData.uid2 === uid)) {
            isExist = true
            data = elementData
            id = element.id
        }
    })
    
    if (!isExist) {
        id = uuid()
        const docRef = await doc(db, "messages", id)

        await setDoc(docRef, {
            messages: [{items: []}],
            uid1: uid,
            uid2: friendId
        }, id)
    }

    return id
}

export const addMessage = async (roomId, value, uid) => {
    const messagesRef = await doc(db, "messages", roomId)
    const message = await getDoc(messagesRef)
    const date = Date.now()

    const newData = [...message.data().messages[0].items, {
        date: date,
        message: value,
        sender: uid
    }]

    await setDoc(messagesRef, {
        ...message.data(),
        messages: [{
            items: newData
        }]
    })
}

// ---- UPDATE ----

// ---- DELETE ----
