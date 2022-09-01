import React from "react";
import { Button } from "@material-ui/core";

import "./Login.css";

const Login = () => {
  const signIn = () => {};

  return (
    <div className="login">
      <div className="login__container">
        <img src="logo512.png" alt="whatsapp" />

        <div className="login__text">
          <h1>Sign in to Messaging App</h1>
        </div>

        <Button onClick={signIn}>Sign In Google</Button>
      </div>
    </div>
  );
};

export default Login;
