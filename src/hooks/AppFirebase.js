import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyueUyhQdHTWDhQM1ZBdGl0bBjLMVULp8",
  authDomain: "documentalletrasuv.firebaseapp.com",
  projectId: "documentalletrasuv",
  storageBucket: "documentalletrasuv.appspot.com",
  messagingSenderId: "378694096006",
  appId: "1:378694096006:web:98b852973806a1f576ad07",
  measurementId: "G-3S6GCZBELV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;