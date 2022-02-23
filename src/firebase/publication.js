import { doc, getDoc, setDoc, getDocs, query, collection, where, limit, orderBy, deleteDoc } from "firebase/firestore"
import { ref as sRef, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase-config"
import { v4 as uuid } from "uuid"
import { getCurrentUser, updateUser } from "./user"

// ---- GET ----
export const getFillAccount = async (uid) => {
    const collectionRef = await collection(db, "publications")
    const queryPublications = await query(collectionRef, where("uid", "==", uid))
    let data = []

    const publications = await getDocs(queryPublications)

    publications.forEach(element => {
        data.push({
            ...element.data(),
            id: element.id
        })
        data = data.reverse()
    })

    return data
}

export const getFillAll = async (date, limitNbr) => {
    const likesRef = await collection(db, "likes")
    const collectionRef = await collection(db, "publications")
    const queryPublication = await query(collectionRef, where("date", "<", date), orderBy("date", "desc"), limit(limitNbr))
    let data = []

    const publications = await getDocs(queryPublication)
    
    // Data publication
    publications.forEach(element => {
        const elementData = element.data()
        data.push({
            ...elementData,
            id: element.id
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
    let data = {}
    try {
        const likesRef = await collection(db, "likes")
        const collectionRef = await doc(db, "publications", id)
        let peopleLike = []
        
        // Data publication
        const publications = await getDoc(collectionRef)
        data = {
            ...publications.data(),
            id: publications.id
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
    } catch {
        return data
    }
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
    }
    return false
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
export const updateLike = async (data, peopleLike) => {
    const publicationRef = await doc(db, "publications", data.id)
    const likesRef = await collection(db, "likes")
    const queryLikes = await query(likesRef, where("publicationId", "==", data.id))
    
    // Like
    const likes = await getDocs(queryLikes)

    likes.forEach(async like => {
        const docRef = await doc(db, "likes", like.id)
        await setDoc(docRef, {
            publicationId: data.id,
            peopleLike: peopleLike
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
        const likes = await getDocs(queryLikes)

        likes.forEach(async like => {
            const docRef = await doc(db, "likes", like.id)
            await deleteDoc(docRef)
        })    
        

        // Comments
        const comments = await getDocs(queryComments)

        comments.forEach(async comment => {
            const docRef = await doc(db, "comments", comment.id)
            await deleteDoc(docRef)
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