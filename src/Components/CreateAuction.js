import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { Box } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import { useDocument } from "react-firebase-hooks/firestore";
import { storage, db } from "../firebase";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
export default function Auction({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [user] = useAuthState(auth);
  const [catagoryData, setCatagories] = useState([]);
  const [productData, setProducts] = useState([]);
  const [animalData, setAnimals] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedProductValue, setSelectedProductValue] = useState("");
  const [selectedAnimalValue, setSelectedAnimalValue] = useState("");

  useEffect(() => {
    let dataCatagory = [];
    let dataProduct = [];
    let dataAnimals = [];
    db.collection("catagories").onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        dataCatagory.push({ id: doc.id, data: doc.data() });
        return doc.data();
      })
    );
    db.collection("products").onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        dataProduct.push({ id: doc.id, data: doc.data() });
        return doc.data();
      })
    );
    db.collection("animals").onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        dataAnimals.push({ id: doc.id, data: doc.data() });
        return doc.data();
      })
    );
    setAnimals(dataAnimals);
    setProducts(dataProduct);
    setCatagories(dataCatagory);
  }, []);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((resp) => {
        // get all users
        resp.docs.map((doc) => {
          doc.data();
        });
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCategoryChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProductValue(e.target.value);
  };
  const handleAnimalChange = (e) => {
    setSelectedAnimalValue(e.target.value);
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
    productPrice,
    currentBid,
    currentBidder
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
        currentBid: productPrice,
        currentBidder: "",
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
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "white" }}
      >
        Create Auction
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>New Auction</DialogTitle>
        <DialogContent>
          <FormContainer
            defaultValues={{ auctionDate: "" }}
            onSubmit={(data) => {
              try {
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
                  data.productPrice,
                  data.currentBid,
                  data.currentBidder
                );
              } catch (error) {
                alert(error);
              }
            }}
            onSuccess={(data) => {
              try {
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
                  data.productPrice,
                  data.currentBid,
                  data.currentBidder
                );
              } catch (error) {
                alert(error);
              }
            }}
          >
            <Box>
             
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
                label="Auction Start Time in hours"
                required
                type={"time"}
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              />
              <TextFieldElement
                name="auctionEndTime"
                label="Auction End Time in hours"
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
              <FormControl style={{ marginTop: 16 }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedValue}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {catagoryData?.map((category) => (
                    <MenuItem value={category?.data?.categoryName}>
                      {category?.data?.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedValue === "Products" ? (
                <FormControl style={{ marginTop: 16 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Products
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-Products"
                    id="demo-simple-Products"
                    value={selectedProductValue}
                    label="Products"
                    onChange={handleProductChange}
                  >
                    {productData[0]?.data?.products?.map((product) => (
                      <MenuItem value={product}>{product}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl style={{ marginTop: 16 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Animals</InputLabel>
                  <Select
                    labelId="demo-simple-select-Animals"
                    id="demo-simple-Animals"
                    value={selectedAnimalValue}
                    label="Products"
                    onChange={handleAnimalChange}
                  >
                    {animalData?.map((animals) => (
                      <MenuItem value={animals?.data?.animalType}>
                        {animals?.data?.animalType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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

const createAuctionContainer = styled.div``;