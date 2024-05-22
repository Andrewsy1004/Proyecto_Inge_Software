import { Delete, DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
import {ImgGaleri} from "../components"
import {useForm} from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useMemo, useRef, useState } from "react"
import { setActionNote } from "../../store/Journal/JournalSlice"
import { startDeletingNote, startSaveNote, startUpLoadingFiles,startLoadNotes } from "../../store/Journal/thunks"
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteViews = () => {
  
  const noteStatusOptions = useMemo(() => [
    { status: 'Finished' },
    { status: 'In Progress' },
    { status: 'Without Starting' }
], []); 

  const dispatch = useDispatch();
  const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
  const fileInput = useRef();

  const { body,title,date,onInputChange,formState } = useForm(note)

  const notes = useSelector(state => state.journal.notes);
  const matchedNote = notes.find(n => n.date === note.date);
  
  const filterNote = noteStatusOptions.filter(option => option.status === matchedNote?.status)
  
  const [statusCheck, setCheckboxSelected] = useState(filterNote.length > 0 ? filterNote[0] : null);

  useEffect(() => {
    const newFilter = noteStatusOptions.filter(option => option.status === matchedNote?.status);
    setCheckboxSelected(newFilter.length > 0 ? newFilter[0] : null);
  }, [matchedNote, noteStatusOptions]);
  

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString(); 
  }, [date])


  const onSaveNote = () => {
    dispatch(startSaveNote(statusCheck))
    dispatch(startLoadNotes())
  }

  const onFileInputChange = ({target}) => {
    if(target.files === 0) return;
    dispatch(startUpLoadingFiles(target.files))
  }
  
  const onDelete = () => {
    dispatch(startDeletingNote());
  }
  

  useEffect(() => {
    dispatch(setActionNote(formState));
  },[formState])
  
  useEffect(() => {
    if(messageSaved.length > 0){
       Swal.fire('Saved', messageSaved, 'success');
    }
  },[messageSaved])
  

  return (
    <>
    
    <Grid 
     container 
     direction="row" 
     justifyContent="space-between" 
     alignItems="center" 
     sx={{ mb: 1 }} 
     className="animate__animated animate__fadeIn animate__faster">

        <Grid item>
            <Typography variant="h5">{dateString}</Typography>
        </Grid>
        
        <Grid item>
          <input 
            type="file" 
            multiple
            onChange={onFileInputChange}
            style={{ display: 'none' }}
            ref={fileInput} />

          <IconButton 
            sx={{ ml: 2 }}
            color="primary"
            disabled={isSaving}
            onClick={() => fileInput.current.click()}>
            <UploadFileOutlined />
          </IconButton> 

           <Button 
             disabled={isSaving}
             onClick={onSaveNote}
             color="primary" 
             sx={{ padding: 2 }}>
             <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
             Saved
            </Button>
        </Grid> 
        
        <Grid container>
           <TextField 
            type="text"
            variant="filled"
            fullWidth 
            placeholder="Enter title" 
            label="Title"
            name="title"
            value={title}
            onChange={onInputChange}
            sx={{ border: 'none', mb: 1}} />

          <TextField 
            type="text"
            variant="filled"
            fullWidth 
            multiline
            placeholder="What Happend Today?" 
            name="body"
            value={body}
            onChange={onInputChange}
            minRows={5}
             />

        <Autocomplete
          sx={{mt: 1}}
          disablePortal
          fullWidth 
          id="status-combo-box"
          options={noteStatusOptions}
          value={statusCheck} 
          onChange={(event, newValue) => {
            setCheckboxSelected(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Status"
              variant="filled"
              color="primary" 
            />
          )}
          getOptionLabel={(option) => option.status || ''}
          isOptionEqualToValue={(option, value) => option.status === value.status}
          disableClearable 
          freeSolo={false} 
         />
          
        </Grid>

        <Grid container justifyContent="end"> 
           <Button disabled={isSaving} color="error" onClick={onDelete}>
               <DeleteOutline />
               Delete
           </Button>
        </Grid>

        <ImgGaleri images={note.imageUrls} />
    </Grid>
    
    </>
  )
}
