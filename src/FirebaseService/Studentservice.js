import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, getDoc, query, where } from 'firebase/firestore';
import app from "../hooks/AppFirebase";
const db = getFirestore(app);



export const getStudentByTuition = async (tuition) => {

    try{
        const userCollection = collection(db, 'students');
        const response = query(userCollection, where("Matricula", "==", tuition));
        const querySnapshot = await getDocs(response);
        let responseData = null;
        querySnapshot.forEach((doc) => {
            responseData = doc.data();
        });

        return responseData;
    }catch(error){
        console.log(error);
    }

}