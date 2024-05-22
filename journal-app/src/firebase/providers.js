import {signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword, 
        updateProfile, 
        signInWithEmailAndPassword,
        getAuth,GithubAuthProvider  }
from "firebase/auth";
import { FirabaseAuth } from "./config.js";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async() => {
    try {
       const result = await signInWithPopup(FirabaseAuth, googleProvider);  
       // const credentials = GoogleAuthProvider.credentialFromResult(result);
       const { uid, displayName, email, photoURL } = result.user;
       
       return {
          ok: true, 
          uid, 
          displayName, 
          email, 
          photoURL
       }
      
    }catch(error) {
      console.log(error);
      
      return {
         ok: false, 
         errorMessage: error.message
      }

    }
}


export const registerUserWithEmailPassword = async({ email, password, fullname }) => {
   try {
      const resp = await createUserWithEmailAndPassword(FirabaseAuth, email, password);
      const { uid, photoURL } = resp.user;
      
      await updateProfile(FirabaseAuth.currentUser, { displayName: fullname });

      return { ok: true, uid, photoURL, email, fullname };

   }catch (error) {
      console.log(error);
      return{ 
       ok: false, 
       errorMessage: error.message 
      }  
   }
}


export const loginWithEmailPassword = async({email, password}) => {
   try {
     const user = await signInWithEmailAndPassword(FirabaseAuth, email, password);
 
     return {
       ok: true,
       user
     }
 
   } catch (error) { 
     console.error(error);
 
     return {
       ok: false,
       errorMessage: error.message
     }
   }
 }


 export const logoutFirebase = async() => {
    return await FirabaseAuth.signOut();
 }

