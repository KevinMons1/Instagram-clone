import { doc, getDoc, setDoc, getDocs, query, collection, where, limit, onSnapshot } from "firebase/firestore"
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase-config"
import { v4 as uuid } from "uuid"

// ---- GET ----
// Get data current user
export const getCurrentUser = async (uid) => {
    const collectionRef = await doc(db, "users", uid)
    const docSnap = await getDoc(collectionRef)
    let data = {}

    if (docSnap.exists()) {
        data = await docSnap.data()
    } 

    return data
}

export const getFillAccount = async (uid) => {
    const collectionRef = await collection(db, "publications")
    const queryUid = await query(collectionRef, where("uid", "==", uid))
    let data = []

    const querySnapshot = await getDocs(queryUid)

    querySnapshot.forEach(item => {
        data.push({
            ...item.data(),
            id: item.id
        })
    })

    return data
}

export const getFillAll = async (limitNbr) => {
    const likesRef = await collection(db, "likes")
    const collectionRef = await collection(db, "publications")
    const queryUid = await query(collectionRef, limit(limitNbr))
    let data = []

    const querySnapshot = await getDocs(queryUid)
    
    // Data publication
    querySnapshot.forEach(item => {
        const itemData = item.data()
        data.push({
            ...itemData,
            id: item.id
        })
    })

    
    // Data user
    for (let i = 0; i < data.length; i++) {
        const userData = await getCurrentUser(data[i].uid)
        const queryLikes = await query(likesRef, where("publicationId", "==", data[i].id))
        const likesData = await getDocs(queryLikes)
        
        let peopleLike = []
        
        likesData.forEach(likes => {
            peopleLike = likes.data().peopleLike
        })
        
        data[i] = {
            publication: {
                ...data[i],
                peopleLike: peopleLike
            },
            user: userData
        }
    }

    return data
}

export const getPublicationOne = async (id) => {
    const likesRef = await collection(db, "likes")
    const collectionRef = await doc(db, "publications", id)
    let data = {}
    
    // Data publication
    const querySnapshot = await getDoc(collectionRef)
    data = {
        ...querySnapshot.data(),
        id: querySnapshot.id
    }

    
    // Data user
    const userData = await getCurrentUser(data.uid)
    const queryLikes = await query(likesRef, where("publicationId", "==", data.id))
    const likesData = await getDocs(queryLikes)
    
    let peopleLike = []
    
    likesData.forEach(like => {
        peopleLike = like.data().peopleLike
    })
    
    data = {
        publication: {
            ...data,
            peopleLike: peopleLike
        },
        user: userData
    }

    return data
}

export const getComments = async (id) => {
    const commentsRef = await collection(db, "comments")

    const queryComments = await query(commentsRef, where("publicationId", "==", id))
    const commentsData = await getDocs(queryComments)

    let peopleComment = []
    
    commentsData.forEach(comment => {
        peopleComment = comment.data().peopleComment[0].items
    })

    return peopleComment
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
    const likesRef = await doc(db, "likes", uuid())
    
    if (arrFiles.length > 0) {
        // Images
        for (let i = 0; i < arrFiles.length; i++) {
            const storageImageRef = sRef(storage, "/images/publications/" + uuid())
            const storageVideoRef = sRef(storage, "/videos/publications/" + uuid())
            
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
            date: date,
            uid: uid,
            files: arrPath
        })

        // Update user
        const userData = await getCurrentUser(uid)
        const publications = userData.publications + 1
        await updateUser({
            ...userData,
            uid: uid,
            publications: publications
        })

        // Add likes
        await setDoc(likesRef, {
            publicationId: id,
            peopleLike: []
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

export const updateLike = async (data, peopleLike) => {
    const publicationRef = await doc(db, "publications", data.id)
    const likesRef = await collection(db, "likes")
    const queryLikes = await query(likesRef, where("publicationId", "==", data.id))

    // Like
    const snapshot = onSnapshot(queryLikes, (item) => {
        item.forEach(async (like) => {
            const collectionRef = await doc(db, "likes", like.id)
            await setDoc(collectionRef, {
                publicationId: data.id,
                peopleLike: peopleLike
            })
        })
    })

    // Publication
    await setDoc(publicationRef, data)
    return
}