import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from './auth';
import { journalSlice } from './Journal';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
})