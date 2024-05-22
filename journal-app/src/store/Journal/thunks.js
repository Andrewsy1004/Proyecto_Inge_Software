import {collection,deleteDoc,doc, setDoc} from 'firebase/firestore/lite';
import { FirabaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActionNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './JournalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
    return async(dispatch, getState) => {
       
       dispatch(savingNewNote())

       const {uid} = getState().auth;
        
       const newNote = {
           title: '',
           body: '',
           date: Date.now(),
       }
       
       const newDoc = doc(collection(FirabaseDB, `${uid}/journal/notes`));
       const resp = await setDoc(newDoc, newNote);
       
       newNote.id = newDoc.id;
     
       dispatch( addNewEmptyNote(newNote) );
       dispatch( setActionNote(newNote) );
 
    } 

}

export const startLoadNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = (statusCheck) => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        
        const status = statusCheck.status;

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        const noteToFireStore = {
            ...note,
            status  
        };

        delete noteToFireStore.id;

        const docRef = doc(FirabaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNote(noteToFireStore));

        startLoadNotes();
    }
}

export const startUpLoadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        
        //await fileUpload(files[0]); 
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ))
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirabaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );

    }
}