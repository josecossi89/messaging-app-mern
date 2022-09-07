import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase.js";
import "./Login.css";
import { actionsTypes } from "./reducer.js";
import { useStateValue } from "../StateProvider.js";
const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({ type: actionsTypes.SET_USER, user: result.user });
      })
      .catch((error) => alert(error.message));
  };

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
