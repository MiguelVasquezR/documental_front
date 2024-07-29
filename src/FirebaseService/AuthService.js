
import app from "../hooks/AppFirebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(app);


export const createAccount = async (data) => {
    try {
        const create = await createUserWithEmailAndPassword(auth, data.usuario, data.password);
        const user = create.user;
        if (user) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export const login = async (data) => {
    try{
        const login = await signInWithEmailAndPassword(auth, data.usuario, data.password);
        const user = login.user;
        if(user){
            return true;
        }
    }catch(error){
        return false;
    }
}