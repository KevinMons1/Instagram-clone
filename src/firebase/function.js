import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL   } from "firebase/storage"
import { db, storage } from "./firebase-config"
import { v4 as uuid } from "uuid"

// Get data current user
export const getCurrentUser = async (uid) => {
    const collectionRef = await doc(db, "users", uid)
    const docSnap = await getDoc(collectionRef)
    let data = {}

    if (docSnap.exists()) {
        data = docSnap.data()
    } 

    return data
}

export const updateUser = async (data) => {
    const collectionRef = await doc(db, "users", data.uid)
    await setDoc(collectionRef, data)
    return
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