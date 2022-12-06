import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AuctionHeader from "./AuctionHeader";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Countdown from "react-countdown";
import { db } from "../firebase";
import { auth } from "../firebase";
import moment from 'moment';
function AuctionLink() {
  let { id } = useParams();
  const [bidAmount, setBidAmount] = useState(0);

  const [user] = useAuthState(auth);
  const [auctionDetails] = useDocument(id && db.collection("auctions").doc(id));
  console.log("hey data",auctionDetails?.data()) 
  const bidNow = () => {
    if (bidAmount > auctionDetails?.data().currentBid) {
      db.collection("auctions").doc(id).update({
        currentBid: bidAmount,
        currentBidder: user.email,
      });
    } else {
      alert("Your bid amount is less than the current bid amount");
    }
  };
   
  console.log(
    "🚀 auctionDetails.data()",
    Date.now(),
    Date.now(auctionDetails?.data().auctionDate)
    
  );
  let time1 = moment(auctionDetails?.data().auctionStartTime, "h");
   let time2 = moment(auctionDetails?.data().auctionEndTime, "h");
   let subtract = time1.subtract(time2);
   let format = moment(subtract).format("h")
   console.log("hey",format); 
   let timeInBetween = (format* 60 * 60 *1000)
   console.log('Hey timeinbetween', timeInBetween)
   
   const [time, setTime ] = useState(timeInBetween);

   useEffect(() => {
    setTimeout(() =>{
      setTime(time-1000);
    }, 1000);

   },[time]);
    const getCountDown = (milliseconds) => {
      let totalSeconds = parseInt(Math.floor(milliseconds/1000));
      let totalMinutes = parseInt(Math.floor(totalSeconds/60));
      let totalHours = parseInt(Math.floor(totalMinutes/60));

      let seconds = parseInt(totalSeconds % 60);
      let minutes = parseInt(totalMinutes % 60);
      let hours = parseInt(totalHours % 60);
      console.log('Hey countdown',seconds)
    console.log('Hey countdown',minutes)
    console.log('Hey countdown',hours)
      return (
        `${hours} : ${minutes} : ${seconds}`
      )
    }
    console.log('Hey countdown',getCountDown)

    const Completionist = () => <span>The winner is Anathi Makamane!</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

     
  return (
    <div>
      <AuctionHeader />
      <AuctionLinkContainer>
        <AuctionLinkContainer2>
          <ImgBox>
            <img
              src={auctionDetails?.data()?.productImage}
              alt="product picture"
            />
          </ImgBox>
          <AuctionInfoBox>
            <h1>Product Name: {auctionDetails?.data()?.productName}</h1>

            <p>
              Product Description: {auctionDetails?.data()?.productDescription}
            </p>
            <h4>Product price: {auctionDetails?.data()?.productPrice}</h4>

            <h3>Bid amount: {auctionDetails?.data()?.currentBid} </h3>
            <h3>Current Bidder: {auctionDetails?.data()?.currentBidder} </h3>
            <BidBox>
              <TextField
                label="Enter Amount"
                variant="outlined"
                type="number"
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <Button
                type="submit"
                onClick={() => {
                  bidNow();
                }}
              >
                Bid Now
              </Button>
            </BidBox>
            <hr />
            {/* <h4>Auction ends in: {getCountDown(timeInBetween)} </h4> */}
            <h4>Auction ends in: </h4>
             <Countdown
              date={Date.now(auctionDetails?.data().auctionStartTime) + 400000}
              renderer={renderer}
            > 
              <h6>Auction Ended</h6>
             </Countdown> 
            {/* <TextField label="Winner Is!!" variant="outlined" /> */}
          </AuctionInfoBox>
        </AuctionLinkContainer2>
      </AuctionLinkContainer>
    </div>
  );
}

export default AuctionLink;

const AuctionLinkContainer = styled.div`
  text-align: "center";
  /* height: 100%;
 width: 100%; */

`;
const AuctionLinkContainer2 = styled.div`
  align-items: "center";
  /* width: 100%; */
  display: flex;
   
`;
const ImgBox = styled.div`
  /* height:500px;
  width: 500px; */

  > img {
    padding: 50px;
    margin-top: 100px;
    width: 500px;
    height: 500px;
  }
`;
const AuctionInfoBox = styled.div`
  /* height:50%;
  width: 50%; */
  padding: 250px;
  margin-top: -120px;

  > hr {
    margin-top: 20px;
  }
`;
const BidBox = styled.div`
  display: flex;

  > button {
    background-color: #0a8d48;
    color: white;
  }
`;