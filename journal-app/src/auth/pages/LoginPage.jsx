import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";

import {AuthLayout} from "../layout/AuthLayout.jsx";

import {useForm} from "../../hooks/useForm.js";
import { checkAutentication,startGoogleSignIn, startLogingWithEmailPassword } from "../../store/auth/thumbs.js";


const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  
  const dispatch = useDispatch();

  const {email,password,onInputChange,onResetForm} = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    
    dispatch(startLogingWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  

  return (
      <AuthLayout title="Login"> 
       <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
         <Grid container>
           <Grid item xs={ 12 } sx={{mt: 2}} >
             <TextField 
              label="Email" 
              type="email" 
              placeholder="Email" 
              fullWidth 
              name="email"
              onChange={onInputChange} 
              value={email}  />
           </Grid>
           
           <Grid item xs={ 12 } sx={{mt: 2}} >
             <TextField 
              label="password" 
              type="password" 
              placeholder="password" 
              fullWidth 
              name="password"
              onChange={onInputChange} 
              value={password} />
           </Grid>
           
           <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}} >
             <Grid item xs={ 12 } sm={ 6 } >
               <Button variant="contained" fullWidth type="submit">
                 Login
               </Button>
             </Grid>

             <Grid item xs={ 12 } sm={ 6 } >
               <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
                 <Google />
                 <Typography sx={{ml: 1}}>Google</Typography>
               </Button>
             </Grid>
           </Grid>
           
           
           <Grid container direction="row" justifyContent="end">
             <Link component={RouterLink} color="inherit" to="/auth/register" >Create an account</Link>
           </Grid>


         </Grid>
       </form>
       
      </AuthLayout>
  )
}
