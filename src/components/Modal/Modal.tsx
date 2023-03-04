import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import SignIn from '../SignIn/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase';

interface Props {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({openModal, setOpenModal}:Props ) {
  const [user, loading, error] = useAuthState(auth);



  const handleClose = () => {
    setOpenModal(false);
  };

  
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <SignIn handleClose={handleClose}/>
      </Dialog>
    </div>
  );
}