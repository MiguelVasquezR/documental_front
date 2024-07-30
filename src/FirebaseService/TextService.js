import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import app from '../hooks/AppFirebase';
const bd = getFirestore(app);


export const addText = async (data) => {
    try{
        const response = await addDoc(collection(bd, 'texts'), data);
        if(response.id){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.log(err);
    }
}

export const getTexts = async () => {
    const querySnapshot = await getDocs(collection(bd, 'texts'));
    const textsArray = [];
    querySnapshot.forEach((doc) => {
        const text = {
            id: doc.id,
            ...doc.data()
        }
        textsArray.push(text);
    });
    return textsArray;
}

export const getTextByID = async (id) => {
    try {
        const docRef = doc(bd, "texts", id);
        const docSnap = await getDoc(docRef);
        let data = null;
        if (docSnap.exists()) {
            data = {
                id: docSnap.id,
                ...docSnap.data()
            }
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error getting document:", error);
        return null;
    }
}


export const getTextByCode = async (code) => {
    try {
        const colref = collection(bd, 'texts');
        const q = query(colref, where("Codigo", "==", code));
        const querySnapshot = await getDocs(q);
        const res = [];

        querySnapshot.forEach((doc) => {
            res.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        
        return res;
    } catch (error) {
        console.log("Error getting document:", error);
        return null;
    }
}

export const deleteText = async (id) => {
    try {
        await deleteDoc(doc(bd, "texts", id));
        return true;
    } catch (error) {
        console.error("Error removing document: ", error);
        return false;
    }
}

export const updateText = async (data, id) => {

    try {
        const docRef = doc(bd, "texts", id);
        await updateDoc(docRef, data);
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }



}