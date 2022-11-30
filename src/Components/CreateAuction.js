import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Box } from "@material-ui/core";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import { getDatabase, ref, child, get } from "firebase/database";
import { storage, db } from "../firebase";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";


export default function Auction({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => {
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

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = refStorage(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };
  const createAuction = (
    auctionId,
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
        auctionId: auctionId,
        auctionDate: auctionDate,
        auctionEndTime: auctionEndTime,
        auctionStartTime: auctionStartTime,
        auctionTitle: auctionTitle,
        productDescription: productDescription,
        productImage: productImage,
        productLocation: productLocation,
        productName: productName,
        productPrice: productPrice,
      })
      .then(async (docRef) => {
        db.collection("rooms")
          .get()
          .then((resp) => {
            resp.docs.map((doc) => {
              db.collection("rooms").doc(doc.id).collection("messages").add({
                message: "New Auction ",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: "System",
              });
            });
          });
      });

    handleClose();
  };

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
              createAuction(
                data.auctionId,
                data.auctionDate,
                data.auctionEndTime,
                data.auctionStartTime,
                data.auctionTitle,
                data.productDescription,
                imgUrl,
                data.productLocation,
                data.productName,
                data.productPrice
              );
            }}
            onSuccess={(data) => {
              createAuction(
                data.auctionId,
                data.auctionDate,
                data.auctionEndTime,
                data.auctionStartTime,
                data.auctionTitle,
                data.productDescription,
                imgUrl,
                data.productLocation,
                data.productName,
                data.productPrice
              );
            }}
          >
            <Box>
              <TextFieldElement
                name="Auction Id"
                label="Auction Id"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="auctionDate"
                label="Auction Date: "
                required
                type={"date"}
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="auctionStartTime"
                label="Auction Start Time:"
                required
                type={"time"}
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="auctionEndTime"
                label="Auction End Time:"
                required
                type={"time"}
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="auctionTitle"
                label="Auction Title"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="productName"
                label="Product name:"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <input type="file" accept="image/*" onChange={handleChange} />
              
              <TextFieldElement
                name="productDescription"
                label="Product Description"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="productLocation"
                label="Product location"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="productPrice"
                label="Product Price"
                required
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
            </Box>
            <div style={{ display: "flex" }}>
              <Button onClick={handleClose}>Cancel</Button>
              {progresspercent === 100 && <Button type="submit">Submit</Button>}
            </div>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}