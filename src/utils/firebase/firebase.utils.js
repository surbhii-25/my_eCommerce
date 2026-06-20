import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
 } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDfl7aEvOv43xE7Tb-AsJweB1G_7nZpAQk",
  authDomain: "first-ecommerce-id.firebaseapp.com",
  projectId: "first-ecommerce-id",
  storageBucket: "first-ecommerce-id.firebasestorage.app",
  messagingSenderId: "575646773536",
  appId: "1:575646773536:web:28bb5bf0633d8c84a9e745"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userDocRef); 

  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{ 
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    }catch (error){
      console.log('error creating the user',error.message)
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}