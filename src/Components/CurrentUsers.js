import React, { useEffect } from 'react'
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useState } from "react";
function CurrentUsers({photoURL, displayName}) {
    const auth = getAuth();
  const [authUsers , getAuthUsers] = useState([])
//  React.useEffect(() => {
//     db.collection("users")
//       .get()
//       .then((resp) => {
//         // get all users
//         console.log(
//           " ~ users ~ resp",
//           resp.docs.map((doc) => {
//             doc.data();
//           })
//         );
//       });
//   }, []);
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
    <div>{authUsers.photoURL}{authUsers.displayName}</div>
  )
}

export default CurrentUsers