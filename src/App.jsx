import React from 'react';
import Button from '@mui/material/Button';
import "./styles/app.css";

function App() {
  return (
    <>
    <div className="App">
        <div className="container">
          <h1>
            Welcome Back
            <br />
            Login <span>To Continue</span>.
          </h1>
          <p>
            The seconds, minutes, and hours slip away,
            <br />
            each one bringing us closer to the future and farther from the past
          </p><br />
          <a href="#">Login</a>
          <div className="bg"></div>
        </div>
      </div>
    </>
  );
}

export default App;
