import React, { useEffect } from 'react'
import { db } from "../firebase";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
function CurrentUsers({ pressOpen, makeOpen }) {
   const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
   const theme = useTheme();
  const defaultMaterialTheme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const letOpen = () => {
    makeOpen(true);
  };
  const makeClose = () => {
    makeOpen(false);
  };
    
  const [authUsers , getAuthUsers] = useState([])

   
  useEffect(() => {
    let usersData = [];
    db.collection("users").onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        usersData.push(doc.data());
        return doc.data();
      })
    );
    getAuthUsers(usersData);
  }, []);
 console.log('users', authUsers)

  return (
  
      <div>
         <Button variant="outlined" onClick={letOpen} sx={{ color: "white" }}>
        List Of People
      </Button>
      <Dialog open={pressOpen} onClose={makeClose} fullScreen={fullScreen} fullWidth={fullWidth}
        maxWidth={maxWidth}>
         <DialogTitle>List of People</DialogTitle>
        <DialogContent>
          
            <ThemeProvider theme={defaultMaterialTheme}>
              {authUsers?.map((theUsers) => {
        return (
          <div key={theUsers?.name} style={{ display: "flex" ,height:"30px", width:"30px", padding: "20px"}}>
            <img src={theUsers?.photo} alt="" />
            <span style={{ display: "flex"}}>{theUsers?.name}</span>
          </div>
        );
      })}
                    
            </ThemeProvider>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={makeClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
   
    
  )
}

export default CurrentUsers