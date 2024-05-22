import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useMemo } from "react";
import {AuthLayout} from "../layout/AuthLayout.jsx";
import {useForm} from "../../hooks/useForm.js";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thumbs.js";


const formData = {
  email: '',
  password: '',
  fullname: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  fullname: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


  const {formState,email,password,fullname,onInputChange,onResetForm,
         isFormValid,emailValid,passwordValid,fullnameValid  } = useForm(formData,formValidations);
  
      
  const onSubmit = (event) => {
    setFormSubmitted(true);
    event.preventDefault();
    
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
    
  }

  return (
    <AuthLayout title="Login"> 
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container>
        <Grid item xs={ 12 } sx={{mt: 2}} >
          <TextField 
           label="Full Name" 
           type="text" 
           placeholder="Full Name" 
           fullWidth 
           onChange={onInputChange} 
           value={fullname} 
           error={!!fullnameValid  && formSubmitted}
           helperText={fullnameValid }
           name="fullname" />
        </Grid>

        <Grid item xs={ 12 } sx={{mt: 2}} >
          <TextField 
           label="Email" 
           type="email" 
           placeholder="Email" 
           onChange={onInputChange}
           value={email}
           name="email"
           error={!!emailValid && formSubmitted}
           helperText={emailValid}
           fullWidth />
        </Grid>
        
        <Grid item xs={ 12 } sx={{mt: 2}} >
          <TextField 
           label="password" 
           type="password" 
           placeholder="password" 
           onChange={onInputChange}
           value={password}
           name="password"
           error={!!passwordValid && formSubmitted}
           helperText={passwordValid}
           fullWidth />
        </Grid>
        
        <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}} >
          
        
          <Grid item xs={ 12 } sm={ 12 } >
            <Button 
               disabled={isCheckingAuthentication}
               variant="contained" 
               fullWidth 
               type="submit">
              Sign up
            </Button>
          </Grid>


        </Grid>

        
        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
          <Link component={RouterLink} color="inherit" to="/auth/login">Enter </Link>
        </Grid>


      </Grid>
    </form>
    
   </AuthLayout>
  )
}
