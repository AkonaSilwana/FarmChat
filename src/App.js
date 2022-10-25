import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import styled from "styled-components";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Components/Login";

function App() {
  const [user, loading] = useAuthState(auth);

  // if (loading) {
  //   return(
  //     <AppLoading>
  //       <AppLoadingContents>
  //         <img  src="https://dribbble.com/shots/14217522-Farm-Logo-Design"
  //         alt=''/>
  //       </AppLoadingContents>
  //     </AppLoading>
  //   )
  // }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
const AppLoading = styled.div``;

const AppLoadingContents = styled.div``;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
