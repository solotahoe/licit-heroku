import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBfsE88sSF1zBHndoEQLvaCNgaUqtkKFGQ",
  authDomain: "licitvip.firebaseapp.com",
  projectId: "licitvip",
  storageBucket: "licitvip.appspot.com",
  messagingSenderId: "667759286109",
  appId: "1:667759286109:web:ebecb4b6c7b4e6fdc97ab4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
