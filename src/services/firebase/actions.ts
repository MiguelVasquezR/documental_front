import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./app";

export const writeData = async (collectionName: string, data: any) => {
  try {
    await addDoc(collection(firestore, collectionName), data);
    return 200;
  } catch (e) {
    return 400;
  }
};

export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export const deleteData = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(firestore, collectionName, id));
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};

export const updateData = async (
  collectionName: string,
  id: string,
  data: any
) => {
  try {
    await updateDoc(doc(firestore, collectionName, id), data);
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
  }
};
