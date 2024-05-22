import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActionNote } from "../../store/Journal/JournalSlice"

export const SideBarItem = ({title, body, id, date, imageUrls=[],status}) => {
  
  const dispatch = useDispatch();

  const oncClickNote = () => {
    dispatch( setActionNote({id, title, body, date, imageUrls}) );
  }
  
  const newTitle = useMemo( () => {
     return title.lenght > 17 ? title.substring(0, 17) + '...' : title
  }, [title])

  

  const getStatusColor = (status) => {
    switch (status) {
      case 'Finished':
        return 'lightgreen'; 
      case 'In Progress':
        return 'lightsalmon'; 
      case 'Without Starting':
        return 'lightcoral';
      default:
        return '';
    }
  };
  
  const statusColor = getStatusColor(status);
  
  return (
    <ListItem  disablePadding style={{ background: statusColor, marginBottom: 5 }}>
     <ListItemButton onClick={oncClickNote}>
      <ListItemIcon>
         <TurnedInNot/>
      </ListItemIcon>
      
      <Grid container>
        <ListItemText primary={newTitle} />
        <ListItemText secondary={body} />

      </Grid>

     </ListItemButton>
   </ListItem>
  )
}
