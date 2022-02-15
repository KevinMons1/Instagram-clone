import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL   } from "firebase/storage"
import { db, storage } from "./firebase-config"
import { v4 as uuid } from "uuid"

// ---- GET ----
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

export const addNewPublication = async (text, uid, arrFiles) => {
    let id = uuid()
    let date = Date.now()
    let arrPath = [{ items: [] }]
    let upload = ""
    let url = ""
    const collectionRef = await doc(db, "publications", id)
    const storageImageRef = sRef(storage, "/images/publications/" + uuid())
    const storageVideoRef = sRef(storage, "/videos/publications/" + uuid())

    if (arrFiles.length > 0) {
        // Images
        for (let i = 0; i < arrFiles.length; i++) {
            if (arrFiles[i].type.includes("image/")) {
                upload = await uploadBytes(storageImageRef, arrFiles[i])
                url = await getDownloadURL(storageImageRef)
            } else if (arrFiles[i].type.includes("video/")) {
                upload = await uploadBytes(storageVideoRef, arrFiles[i])
                url = await getDownloadURL(storageVideoRef)
            }

            // https://stackoverflow.com/questions/46593953/nested-arrays-are-not-supported/46627850#46627850
            arrPath = [{ items: [...arrPath[0].items, {
                filePath: url,
                fileName: upload.metadata.name,
            }]}]
        }

        // Publication
        await setDoc(collectionRef, {
            comments: 0,
            likes: 0,
            text: text,
            data: date,
            userId: uid,
            files: arrPath
        })

        return true
    } else return false
    
}

// ---- UPDATE ----
export const updateUser = async (data) => {
    const collectionRef = await doc(db, "users", data.uid)
    await setDoc(collectionRef, data)
    return
}