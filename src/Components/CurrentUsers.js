import React from 'react'
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
function CurrentUsers({picture, name}) {
    const auth = getAuth();
const user = auth.currentUser;
 React.useEffect(() => {
    db.collection("users")
      .get()
      .then((resp) => {
        // get all users
        console.log(
          " ~ .then ~ resp",
          resp.docs.map((doc) => {
            doc.data();
          })
        );
      });
  }, []);
if (user !== null) {
 
  const displayName = user.displayName;

  const photoURL = user.photoURL;
  }

  return (
    <div>{picture}{name}</div>
  )
}

export default CurrentUsers