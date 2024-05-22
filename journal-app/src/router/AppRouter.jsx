import { Routes, Route, Navigate } from 'react-router-dom';
import {AuthRoute} from '../auth';

import {JournalRoute} from '../journal';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import {useCheckAuth} from '../hooks';

export const AppRouter = () => {
  
  const {status} = useCheckAuth();

  if(status === 'checking'){
   return CheckingAuth();
  }  
 
  return (
    <Routes>

        {
          status === 'authenticated' ? 
          <Route path='/*' element={<JournalRoute />} /> : 
          <Route path='/auth/*' element={<AuthRoute />} />
        }

        <Route path='/*' element={<Navigate to='/auth/login' />} />

       {/* <Route path='/auth/*' element={<AuthRoute />} />
        <Route path='/*' element={<JournalRoute />} />*/}
    </Routes>
  )
}
