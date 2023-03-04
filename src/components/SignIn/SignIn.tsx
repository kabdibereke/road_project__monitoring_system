import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { AuthError } from 'firebase/auth';
interface Props {
  handleClose: () => void
}

const theme = createTheme();

export default function SignIn({handleClose}:Props) {
  const [email, setEmail]= React.useState('')
  const [password, setPassword]= React.useState('')
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithEmailAndPassword(email, password)
  };

  React.useEffect(()=> {
    if(error) {
      toast.error("Неправльный логин и/или пароль", {
        autoClose: 1000,
      })
    }
  },[error])

  React.useEffect(()=> {
    if(user) {
      handleClose()
    }
  },[user])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
       
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'realtive',
            marginTop: "20px"
          }}
        >
          <CloseIcon  onClick={handleClose} sx={{
            width:"20px",
            cursor:'pointer',
            position: 'absolute',
            right:'20px',
           
          }}/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '20px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {loading? "Loading" :"Sign In"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}