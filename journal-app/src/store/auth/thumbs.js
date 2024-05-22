import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../Journal/JournalSlice.js";
import { checkingCredentials, logout, login, loginRegister } from "./authSlice.js";

export const checkAutentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        try {
            dispatch(checkingCredentials());
        
            const result =  await signInWithGoogle();
            
            if (!result.ok) return dispatch(logout(result.errorMessage));
            
            dispatch(loginRegister(result));
        }catch (error) {
            console.log(error);   
        }
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, fullname }) => {
    return async(dispatch) => {
        try {
            dispatch(checkingCredentials());
        
            const res = await registerUserWithEmailPassword({ email, password, fullname });
            
            if (!res.ok) return dispatch(logout(res.errorMessage));
            
            dispatch(loginRegister(res));
            
        }catch (error) {
            console.log(error);   
        }
    }
}

export const startLogingWithEmailPassword = ({ email, password }) => {
   return async(dispatch) => {
       dispatch(checkingCredentials());

       const res = await loginWithEmailPassword({ email, password });
     
       if (!res.ok) return dispatch(logout(res.errorMessage));

       dispatch(login(res));
   }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}