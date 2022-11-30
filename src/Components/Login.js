import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, db, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider)
    .then((resp) => {
      //add users to db
      console.log("user", resp);
      db.collection("users")
      .doc(resp.user.uid)
      .set({
        name: resp?.user?.displayName,
        email: resp?.user?.email,
        photo: resp?.user?.photoURL,
      })
      .then((abc) => {
        console.log("user added to db", abc);
      });
    })
    
    .catch((error) => alert(error.message));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="/Images/farmlogo.jpg"
          alt="logo"
        />

        <h1>WELCOME TO OUR FARM MARKET</h1>
        <Button onClick={signIn}> Sign In with google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
