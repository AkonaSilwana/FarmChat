import React, {useEffect} from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {Sidebar, SubMenu, Menu, MenuItem} from 'react-pro-sidebar'
import Auction from "./CreateAuction";
import { useState } from "react";
import { NoEncryption } from "@material-ui/icons";
import CurrentUsers from "./CurrentUsers";
import ListOfAuctions from "./ListOfAuctions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";


function SidebarComp() {
  const [channels] = useCollection(db.collection("rooms"));
  const [openForm, setOpenForm] = useState(false);
  const [user] = useAuthState(auth);
 const [openTable, setOpenTable] = useState(false);
//  const [userDetals] = useCollection(db.collection("users"));

//  console.log("hey user", userDetals)
   
//  const auth = getAuth();
//   const [authUsers , getAuthUsers] = useState([])

 
//   useEffect(() => {
//     let usersData = [];
//     db.collection("users").onSnapshot((snapshot) =>
//       snapshot.docs.map((doc) => {
//         usersData.push(doc.data());
//         return doc.data();
//       })
//     );
//     getAuthUsers(usersData);
//   }, []);
//     console.log('users', authUsers)
   
  return (
   
      <SidebarContainer>
       
       <SidebarHeader>
        <SidebarInfo> 
          <h2>FARM MARKET</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
          </SidebarInfo> 
        <CreateIcon />
       </SidebarHeader> 
      {/* <Sidebar >
      <Menu style={{backgroundColor:'#0a8d48', color:'white',}}> */}
      <hr />
      {/* <SubMenu Icon={PeopleAltIcon} title="People" >
        {users?.docs.map((doc) => (
          <MenuItem key={doc.id} id={doc.uid} title={doc.data().displayName}></MenuItem>
        ))}
        </SubMenu> */}
        <SidebarOption Icon={PeopleAltIcon} title="People" />
        
         {/* {authUsers?.docs.map((theUsers) => (
          <>
          <span>{theUsers?.data?.photoUrl}</span>
          <span>{theUsers?.data?.displayName}</span> 
          </> 
        ))} */}
         
      <hr />
      {/* <SubMenu Icon={ExpandMoreIcon} title="Auction"> */}
       <SidebarOption Icon={ExpandMoreIcon} title="Auctions" />
       {  user.email === "asilwana30@gmail.com"&&
       <Auction open={openForm} setOpen={setOpenForm}/>}
         
        <ListOfAuctions clickOpen={openTable} getOpen={setOpenTable}/>
       {/* <MenuItem> <Auction open={openForm} setOpen={setOpenForm}/> </MenuItem>
       <MenuItem> <ListOfAuctions clickOpen={openTable} getOpen={setOpenTable}/> </MenuItem> */}
       {/* <MenuItem><Link to="/ListOfAuctions"><Button>List Of Auction</Button></Link></MenuItem> */}
        {/* </SubMenu> */}
      <hr />
      {/* <SubMenu Icon={AddIcon} addChannelOption title="Add Channel"> 
        */}
        {  user.email === "asilwana30@gmail.com"&&
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />}
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      {channels?.docs.map((doc) => (
        //  <MenuItem key={doc.id} id={doc.id} title={doc.data().name}>
         <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        // </MenuItem>
      ))}
     {/* </SubMenu>
      </Menu> */}
      {/* </Sidebar> */}
    </SidebarContainer> 
    
  );
}

export default SidebarComp;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--farm-color);
  flex: 0.3;
  border-top: 1px solid #0a8d48;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #0a8d48;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #0a8d48;
    font-size: 18px;
    background-color: white;
    border-radius: 99px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
