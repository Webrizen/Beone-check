import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';
import { Tooltip, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { TaskAlt, Settings, Folder } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CircularStatic from './circularprogresswithlabel';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("img");
    navigate("/login");
  };

  return (
    <>
      <header>
        <Link to="/dashboard"><div className="logo">
          <img src="/favicon.png" alt="Beone." />
        </div></Link>
        <div className="right-nav">
          {/* Redirect On Click, Yeh Frontend ka Performance thik rakhega  */}
          <Tooltip title='Your Current Status'>
            <div className="ico"><CircularStatic /></div></Tooltip>
          <Tooltip title="Current Task">
            <div className='ico'><TaskAlt /></div>
          </Tooltip>
          <Tooltip title="Your Personal Data Folder">
            <div className='ico'><Folder /></div>
          </Tooltip>
          <Tooltip title='User Controls'>
            <IconButton
              onClick={handleClick}
              size='small'
            >
              <Avatar
                alt='Arshcode'
                src='/static/images/avatar/3.jpg'
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className='MenuLinks'
          >
            <Link to="/profile"><MenuItem onClick={handleClose} className='Cursor'>My Profile</MenuItem></Link>
            <Link to="/dashboard"><MenuItem onClick={handleClose} className='Cursor'>Dashboard</MenuItem></Link>
            <Link to="/settings"><MenuItem onClick={handleClose} className='Cursor'>Settings</MenuItem></Link>
            <hr />
            <MenuItem onClick={handleLogout} className='Cursor'>Logout</MenuItem>
          </Menu>
        </div>
      </header>
    </>
  );
}

export default Navbar;
