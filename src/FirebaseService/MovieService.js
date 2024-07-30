import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, getDoc, updateDoc} from 'firebase/firestore';
import app from '../hooks/AppFirebase';
const db = getFirestore(app);

export const addMovie = async (data) => {
    const ref = await addDoc(collection(db, "movies"), data);
    if(ref.id){
        return true;
    }else{
        return false;
    }
}


export const updateMovie = async (id, data) => {
    try {
        const docRef = doc(db, "movies", id);
        await updateDoc(docRef, data);
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }

}

export const deleteMovie = async (id) => {
    
    try {
        await deleteDoc(doc(db, "movies", id));
        return true;
    } catch (error) {
        return false;
    }

}

export const getMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const moviesArray = [];
    querySnapshot.forEach((doc) => {
        const movie = {
            id: doc.id,
            ...doc.data()
        }
        moviesArray.push(movie);
    });
    return moviesArray;

}

export const getMovieByID = async (id) => {
    try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null; // Retorna null si el documento no existe
        }
    } catch (error) {
        console.log("Error getting document:", error);
        return null; // Retorna null en caso de error
    }
}