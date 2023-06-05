import React from 'react';
import { useState } from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Container, Paper, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import baseApi, { BASE_API } from "../utils/common";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/login.css';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />
  }
  const handleSubmit = (event) => {
    event.preventDefault();


    console.log({ "user": email, "pass:": pass });
    try {

      baseApi.post(`/auth`, {
        email: email,
        password: pass,
      }).then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.profilePic !== undefined && response.data.profilePic !== null) localStorage.setItem("img", response.data.profilePic);
        navigate('/dashboard', { replace: true });
        // <Navigate to="/dashboard" />
      }).catch((error) => {
        console.log("error:", error)
        Swal.fire({
          icon: 'error',
          title: 'Try Again',
          text: 'Wrong Email or Password',
          timer: 2500
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      })
    } catch (error) {
      console.log(error);
      // showSanckAlert('error', 'Please enter correct password!');
    }
  };
  return (
    <div className="background">
      <Container maxWidth="sm">
        <Paper elevation={3} className="glassmorphism-container">
          <img src="/favicon.png" alt="Beone" />
          <h1 className="title">Welcome Back!</h1>
          <form className='loginForm' onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              className="input-field mb-1"
            />
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              onChange={(event) => {
                setPass(event.target.value)
              }}
              required
              name="pass"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  className='checkboxMUI'
                  color="primary"
                />
              }
              label="Keep me logged in"
            />
            <Button type='submit' variant="contained" fullWidth className="submit-button">
              Login
            </Button>
            <a href="#">Forgot Password?</a>
          </form>
        </Paper>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
