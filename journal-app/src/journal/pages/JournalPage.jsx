import { IconButton } from "@mui/material";
import {JournalLayout} from "../layout/JournalLayout.jsx";
import {NothingSelecterViews,NoteViews} from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/Journal/thunks.js";
import { getInformes } from "../../helpers/informe.js";
import { useEffect, useCallback } from 'react';


export const JournalPage = () => {
  
  const dispatch = useDispatch();
  const {isSaving,active} = useSelector(state => state.journal);
  
  const {email} = useSelector(state => state.auth);
  const notes = useSelector(state => state.journal.notes);
 
  const sendReports = useCallback(async () => {
    if (email && notes.length > 0) {  // Asegurar que hay datos para enviar
        try {
            const responseData = await getInformes(email, notes);
            // console.log('Respuesta del servidor:', responseData);
            // console.log('Reporte enviado automáticamente con éxito:', responseData);
        } catch (error) {
            console.error('Error al enviar el reporte automáticamente:', error);
        }
    }
  }, [email, notes]);
  
  useEffect(() => {
    sendReports();
}, [sendReports]);
  
  const onClickNewNote = () => {
    dispatch(startNewNote());
  }


  return (
    <>
      <JournalLayout>
        
        {
          (!!active) 
          ? <NoteViews />
          : <NothingSelecterViews />
        }
         
         
        <IconButton 
          onClick={onClickNewNote}
          disabled={isSaving}
          size="large"
          sx={{
            color:"white", 
            bgcolor:"error.main",
            ":hover":{bgcolor:"error.main",opacity:0.9},
            position:"fixed",
            right:50,
            bottom:50}}>
           <AddOutlined sx={{fontSize:30}} />
        </IconButton> 

       

      </JournalLayout>  
    </> 
  )
}
