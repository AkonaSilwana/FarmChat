import * as React from "react";
import firebase from "firebase/compat/app";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { db, auth } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import { getDatabase, ref, child, get } from "firebase/database";
import styled from "styled-components";
import { Box } from "@material-ui/core";

export default function Auction({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  let allUsers = [];
  React.useEffect(() => {
    db.collection("users")
      .get()
      .then((resp) => {
        // get all users
        console.log(
          "🚀 ~ .then ~ resp",
          resp.docs.map((doc) => {
            doc.data();
          })
        );
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const createAuction = (
    auctionDate,
    auctionEndTime,
    auctionStartTime,
    auctionTitle,
    productDescription,
    productImage,
    productLocation,
    productName,
    productPrice
  ) => {
    db.collection("auctions")
      .add({
        auctionDate: auctionDate,
        auctionEndTime: auctionEndTime,
        auctionStartTime: auctionStartTime,
        auctionTitle: auctionTitle,
        productDescription: productDescription,
        productImage: productImage,
        productLocation: productLocation,
        productName: productName,
        productPrice: productPrice,
        user: [
            {

            }
        ]
      })
      .then(async (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        const abc = db
          .collection("rooms")
          .get()
          .then((resp) => {
            console.log("🚀 ~ .then ~ resp", resp.docs);
            resp.docs.map((doc) => {
              //console.log(doc.id);
              db.collection("rooms").doc(doc.id).collection("messages").add({
                message: "New Auction ",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: "System",
              });
            });
          });
        console.log("🚀 ~ ~ abc", abc);
        // abc.map((room) => {
        //   db.collection("rooms")
        //     .doc(room.channelId)
        //     .collection("messages")
        //     .add({
        //       message: "New Auction",
        //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //       user: "System",
        //     });
        // });

        // const listAllUsers = async (nextPageToken) => {
        //   const res = await firebase.auth().listUsers(1000, nextPageToken);
        //   allUsers.push(...res.users);
        //   if (res.pageToken) {
        //     await listAllUsers(res.pageToken);
        //   }
        // };
        // console.log("all users", allUsers);

        // await listAllUsers();
      });
  };
  //   set(ref(db, 'auctions'), {
  //     auctionDate,
  // auctionEndTime,
  // auctionStartTime,
  // auctionTitle,
  // productDescription,
  // productImage,
  // productLocation,
  // productName,
  // productPrice
  //   });
  // }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Auction
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>New Auction</DialogTitle>
        <DialogContent>
          <FormContainer
            defaultValues={{ auctionDate: "" }}
            onSubmit={(data) => {
              console.log("erer1", data);
              createAuction(
                data.auctionDate,
                data.auctionEndTime,
                data.auctionStartTime,
                data.auctionTitle,
                data.productDescription,
                data.productImage || "",
                data.productLocation,
                data.productName,
                data.productPrice
              );
            }}
            onSuccess={(data) => {
              createAuction(
                data.auctionDate,
                data.auctionEndTime,
                data.auctionStartTime,
                data.auctionTitle,
                data.productDescription,
                data.productImage || "",
                data.productLocation,
                data.productName,
                data.productPrice
              );
              console.log("erer2", data);
            }}
          >
            <Box >
            <TextFieldElement
              name="auctionDate"
              label="Auction Date: "
              required
              type={"date"}
              variant="standard"
              sx={{ m: 1, mt: 3, width: '25ch' }}
              
            />
            <TextFieldElement
              name="auctionStartTime"
              label="Auction Start Time:"
              required
              type={"time"}
              variant="standard"
              sx={{ m: 5, mt: 3, width: '25ch' }}
            />
            <TextFieldElement
              name="auctionEndTime"
              label="Auction End Time:"
              required
              type={"time"}
              variant="standard"
              sx={{ m: 1, mt: 0.5, width: '25ch' }}
            />
           
            <TextFieldElement
              name="auctionTitle"
              label="Auction Title"
              required
              variant="standard"
              sx={{ m: 5, mt: 0.5, width: '25ch' }}
            />
             <TextFieldElement
              name="productName"
              label="Product name:"
              required
              variant="standard"
               sx={{ m: 1, mt: 0.5, width: '25ch' }}
              />
            <TextFieldElement
              name="productImage"
              label="Product image"
              type={"image"}
              variant="standard"
              sx={{ m: 5, mt: 0.5, width: '25ch' }}
            />
            <TextFieldElement
              name="productDescription"
              label="Product Description"
              required
              variant="standard"
               sx={{ m: 1, mt: 0.5, width: '25ch' }}
            />
            <TextFieldElement
              name="productLocation"
              label="Product location"
              required
              variant="standard"
              sx={{ m: 5, mt: 0.5, width: '25ch' }}
            />
            <TextFieldElement
              name="productPrice"
              label="Product Price"
              required
              variant="standard"
              sx={{ m: 1, mt: 0.5, width: '25ch' }}
            />
            </Box>
            <Button type="submit">Submit</Button>
   
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

