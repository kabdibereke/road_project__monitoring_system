import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuthState,useSignOut  } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
const ITEM_HEIGHT = 48;
export default function Header() {
    const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {pathname} = useLocation()
  const [user] = useAuthState(auth);
  const [signOut]  = useSignOut(auth);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pathname=='/3lot' && "3 Лот"}
          {pathname=='/4lot' && "4 Лот"}
          </Typography>
         {!user ? <Button color="inherit"  onClick={()=> setOpenModal(true)} >Admin Mode</Button> : 
         <Button color="inherit"  onClick={async () => {
          const success = await signOut();
          if (success) {
           toast.info('Успешно', {
            autoClose:1000
           })
          }
        }}>Выйти</Button>}
        
        </Toolbar>
      </AppBar>
    </Box>
    <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <Link to={'3lot'}> 
          <MenuItem  onClick={handleClose}>
          3 Лот
          </MenuItem>
        </Link>
       
        <Link to={'4lot'}> 
          <MenuItem  onClick={handleClose}>
          4 Лот
          </MenuItem>
        </Link>
    </Menu>
    <Modal openModal={openModal} setOpenModal={setOpenModal}/>
    
    
    </>
    
  );
}