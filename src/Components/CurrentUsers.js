import React, { useEffect } from 'react'
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useState } from "react";
function CurrentUsers() {
    const auth = getAuth();
  const [authUsers , getAuthUsers] = useState([])

   console.log('users', authUsers)
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


  return (
    // { authUsers?.docs.map((doc) => (
      <div>{authUsers.photoURL}{authUsers.displayName}</div>
    // ))}
    
  )
}

export default CurrentUsers