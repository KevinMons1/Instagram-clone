import { doc, getDoc, setDoc, getDocs, query, collection, where, limit, orderBy, onSnapshot, deleteDoc } from "firebase/firestore"
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
        data = {
            ...data,
            uid: docSnap.id
        }
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
        data = data.reverse()
    })

    return data
}

export const getFillAll = async (date, limitNbr) => {
    console.log(date, limitNbr);
    const likesRef = await collection(db, "likes")
    const collectionRef = await collection(db, "publications")
    const queryPublication = await query(collectionRef, where("date", "<", date), orderBy("date", "desc"), limit(limitNbr))
    let data = []

    const querySnapshot = await getDocs(queryPublication)
    
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
    let peopleLike = []
    
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
    let dataUser = {}
    let peopleUser = []
    let peopleComment = []
    let cid = 0

    const commentsRef = await collection(db, "comments")
    const queryComments = await query(commentsRef, where("publicationId", "==", id))
    const commentsData = await getDocs(queryComments)

    commentsData.forEach(comment => {
        peopleComment = comment.data().peopleComment[0].items
        cid = comment.id
    })

    for (let i = 0; i < peopleComment.length; i++) {
        dataUser = await getCurrentUser(peopleComment[i].uid)
        peopleUser.push({
            ...dataUser,
            uid: peopleComment[i].uid
        })
    }

    for (let i = 0; i < peopleComment.length; i++) {
        peopleComment[i] = {
            comment: peopleComment[i],
            user: {
                username: peopleUser[i].username,
                uid: peopleUser[i].uid,
                imgPath: peopleUser[i].imgPath
            }
        }
    }

    return {
        id: cid,
        comments: peopleComment
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

export const addNewPublication = async (text, uid, arrFiles) => {
    let id = uuid()
    let date = Date.now()
    let arrPath = [{ items: [] }]
    let upload = ""
    let url = ""
    const collectionRef = await doc(db, "publications", id)
    const likesRef = await doc(db, "likes", uuid())
    const commentsRef = await doc(db, "comments", uuid())
    
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

        // Add comments
        await setDoc(commentsRef, {
            publicationId: id,
            peopleComment: [{
                items: []
            }]
        })

        return true
    } else return false
    
}

export const addComment = async (id, data, dataPublication) => {
    try {
        const publicationRef = await doc(db, "publications", dataPublication.id)
        const commentRef = await doc(db, "comments", id)
        const commentDoc = await getDoc(commentRef)
        const commentData = commentDoc.data()
    
        await setDoc(commentRef, {
            publicationId: commentData.publicationId,
            peopleComment: [{
                items: [...commentData.peopleComment[0].items, data]
            }]
        })

        await setDoc(publicationRef, dataPublication)

        return true
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

// ---- DELETE ----
export const deletePublication = async (data) => {
    try {
        const publicationRef = await doc(db, "publications", data.publication.id)
        const userRef = await doc(db, "users", data.user.uid)
        const likesRef = await collection(db, "likes")
        const commentsRef = await collection(db, "comments")
        
        const queryLikes = await query(likesRef, where("publicationId", "==", data.publication.id))
        const queryComments = await query(commentsRef, where("publicationId", "==", data.publication.id))

        // Publication
        await deleteDoc(publicationRef)

        // Likes
        const snapshotLike = onSnapshot(queryLikes, (item) => {
            item.forEach(async (like) => {
                await deleteDoc(doc(db, "likes", like.id))
            })
        })

        // Comments
        const snapshotComment = onSnapshot(queryComments, (item) => {
            item.forEach(async (comment) => {
                await deleteDoc(doc(db, "comments", comment.id))
            })
        })

        // User publication number
        delete data.user.uid
        await setDoc(userRef, {
            ...data.user,
            publications: data.user.publications - 1
        })

        // Storage
        const files = data.publication.files[0].items
        for (let i = 0; i < files.length; i++) {
            if (files[i].filePath.includes("/images%")) {
                const storageRef = await sRef(storage, `images/publications/${files[i].fileName}`)  
                await deleteObject(storageRef)
            } else if (files[i].filePath.includes("/videos%")) {
                const storageRef = await sRef(storage, `videos/publications/${files[i].fileName}`)        
                await deleteObject(storageRef)
            }
        }

        return true
    } catch {
        return false
    }
}