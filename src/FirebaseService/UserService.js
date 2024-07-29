import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore';
import app from '../hooks/AppFirebase';

const db = getFirestore(app);

export const addUser = async (data) => {
    const docRef = await addDoc(collection(db, "users"), {
        usuario: data.usuario,
        password: data.password
    });
    if (docRef.id) {
        return true;
    }else{
        return false;
    }
}

export const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const userArray = [];
    querySnapshot.forEach((doc) => {
        const user = {
            id: doc.id,
            ...doc.data()
        }
        userArray.push(user);
    });
    return userArray;
}

export const getUserByID = async (id) => {
    try {
        const docRef = doc(db, "users", id);
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

export const editUser = async (id, user, password) => {
    try {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            usuario: user,
            password: password
        });
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
};


export const deleteUser = async (id) => {
        try {
            const docRef = doc(db, "users", id);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error("Error deleting document: ", error);  
            return false;
        };
}