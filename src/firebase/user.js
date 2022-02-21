import { doc, getDoc, setDoc, getDocs, query, collection, where, deleteDoc } from "firebase/firestore"
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase-config"
import { v4 as uuid } from "uuid"

// ---- GET ----
export const getCurrentUser = async (uid) => {
    const collectionRef = await doc(db, "users", uid)
    const docSnap = await getDoc(collectionRef)
    let data = {}

    if (docSnap.exists()) {
        data = await docSnap.data()
        data = {
            ...data,
            uid: docSnap.id
        }
    } 

    return data
}

export const getFollowed = async (followedId, followerId) => {
    const followRef = await collection(db, "follow")
    const queryFollow = await query(followRef, where("followedId", "==", followedId))
    const querySnapshot = await getDocs(queryFollow)
    let id = ""

    try {
        if (querySnapshot.size === 0) return id
        else {
            querySnapshot.forEach((item, index) => {
                if (item.data().followerId === followerId) {
                    id = item.id
                    throw id
                }

                if (index === querySnapshot.size) throw id
            })
        }
    } catch (message) {
        return id
    }
}

// ---- POST ----
export const addUser = async (uid, email, name, username, birthday) => {
    try {
        await setDoc(doc(db, "users", uid), {
            email: email,
            username: username,
            name: name,
            birthday: birthday,
            publications: 0,
            subscribers: 0,
            subscriptions: 0,
            description: "",
            imgPath: "",
            imgName: ""
        })
        return {
            step: 4,
            loading: false 
        }   
    } catch(err) {
        alert("Error from server... Try later.")
        return {
            step: 1,
            loading: false 
        }         
    }
}

export const addStorageProfile = async (ref, file, imgName, dataUser) => {
    let newRef = ref + uuid()
    let isDelete = false
    const storageRef = sRef(storage, newRef)
    const deleteRef = sRef(storage, ref + imgName)
    
    if (imgName !== "") {
        await deleteObject(deleteRef)
            .then(() => isDelete = true)
            .catch(() => isDelete = false)
    }

    // Error for delete
    if (imgName !== "" && !isDelete) return false
    else {
        const upload = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)

        // Update users
        const collectionRef = await doc(db, "users", dataUser.uid)

        // Remove uid of object
        delete dataUser.uid

        await setDoc(collectionRef, {
            ...dataUser,
            imgPath: url,
            imgName: upload.metadata.name,
        })

        return true
    }
}

export const addFollow = async (followerId, followedId) => {
    try {
        const id = uuid()
        const followerRef = await doc(db, "users", followerId)
        const followedRef = await doc(db, "users", followedId)
        const followRef = await doc(db, "follow", id)

        await setDoc(followRef, {
            followerId: followerId,
            followedId: followedId
        })

        const followerData = (await getDoc(followerRef)).data()
        const followedData = (await getDoc(followedRef)).data()

        await setDoc(followerRef, {
            ...followerData,
            subscriptions: followerData.subscriptions + 1
        })
        await setDoc(followedRef, {
            ...followedData,
            subscribers : followerData.subscribers  + 1
        })

        return id
    } catch {
        return false
    }
}

// ---- UPDATE ----
export const updateUser = async (data) => {
    const collectionRef = await doc(db, "users", data.uid)
    await setDoc(collectionRef, data)
    return
}

// ---- DELETE ----
export const deleteFollow = async (followId, followerId, followedId) => {
    // just return a typeof string

    try {
        const followerRef = await doc(db, "users", followerId)
        const followedRef = await doc(db, "users", followedId)

        const followerData = (await getDoc(followerRef)).data()
        const followedData = (await getDoc(followedRef)).data()

        await setDoc(followerRef, {
            ...followerData,
            subscriptions: followerData.subscriptions + 1
        })
        await setDoc(followedRef, {
            ...followedData,
            subscribers : followerData.subscribers  + 1
        })

        await deleteDoc(doc(db, "follow", followId))
        
        return ""
    } catch {
        return false
    }
}