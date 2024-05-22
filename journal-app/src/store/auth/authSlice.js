import { createSlice } from '@reduxjs/toolkit'; 
 
export const authSlice = createSlice({ 
    name: 'auth',
    initialState: {
        status: "checking", // 'authenticated', 'not-authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
     },
    reducers: {
        login: (state, {payload}) => {  // Comparar el usuario con la base de datos en este caso firabase
            const {_tokenResponse} = payload.user;
            state.status = 'authenticated';
            state.uid = payload.user.uid;
            state.email = _tokenResponse.email;
            state.displayName = _tokenResponse.displayName;
            state.photoURL = _tokenResponse.photoURL; 
            state.errorMessage = null;
          },
         loginRegister: ( state, {payload} ) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
         }, 
        logout: ( state,payload ) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.payload;
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        }
     } 
 }); 
export const { login, logout,loginGoogle, checkingCredentials,loginRegister } = authSlice.actions;