import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, getDoc, query, where } from 'firebase/firestore';
import app from "../hooks/AppFirebase";
const db = getFirestore(app);



const getStudentByTuition = async (tuition) => {

    try{
        const userCollection = collection(db, 'students');
        const query = query(userCollection, where("matricula", "==", tuition));
        const querySnapshot = await getDocs(query);

        querySnapshot.forEach((doc) => {
            return doc.data();
        });
    }catch(error){
        console.log(error);
    }

}