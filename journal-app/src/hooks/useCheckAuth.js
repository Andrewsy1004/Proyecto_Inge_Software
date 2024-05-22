import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { FirabaseAuth } from "../firebase/config";
import { loginRegister, logout } from "../store/auth/authSlice";
import { startLoadNotes } from "../store/Journal/thunks";

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch();
  
    useEffect(() => {
       onAuthStateChanged(FirabaseAuth, async(user)=>{
        if(!user) return dispatch(logout());
        const {uid, email, displayName, photoURL} = user
        
        dispatch(loginRegister({uid, email, displayName, photoURL}));
        dispatch(startLoadNotes());
  
       })
    },[])

    return{
        status
    }
}