

import { getFirestore, addDoc, collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import app from "../hooks/AppFirebase";
const db = getFirestore(app);

export const createLoans = async (data) => {
    try{
        const response = await addDoc(collection(db, 'loans'), data);
        if(response.id){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

export const updateStatus = async (p) => {
    p.Estado = "Devuelto";
    try {
        const docRef = doc(db, "loans", p.id);
        await updateDoc(docRef, p);
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }

}

export const getLoans = async () => {
    try{

        const ref = await getDocs(collection(db, 'loans'));
        const loansArray = [];
        ref.forEach((doc) => {
            const loan = {
                id: doc.id,
                ...doc.data()
            }
            loansArray.push(loan);
        })
        return loansArray;
    }catch(err){
        console.log(err);
        return false;
    }
}


export const isSvailable = async (codigo) => {
    try{
        const studentSnapshot = await getDocs(collection(db, 'loans'));
        studentSnapshot.forEach((doc) => {
            const docs = doc.data();
            if(docs.Material.Codigo === codigo){
                if(docs.Estado === "Devuelto"){
                    return true;
                }else{
                    return false;
                }
            }
        })
    }catch(err){
        console.log(err);
        return false;
    }
}