
import app from "../hooks/AppFirebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(app);


export const IsLogin = async () => {
    const user = auth.currentUser;
    if(user){
        return true;
    }else{
        return false;
    }
}

export const getUsersAuth = async () => {
    console.log("entro a getUsersAuth");
    try {
        const users = auth.currentUser
        console.log("usuarios" + users.email);
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const logOut = async () => {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        return false;
    }
}


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