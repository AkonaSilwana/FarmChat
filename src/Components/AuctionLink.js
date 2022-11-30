import React from 'react'
import TextField from '@mui/material/TextField';
import AuctionHeader from './AuctionHeader';
import styled from 'styled-components';
import Button from "@mui/material/Button";

function AuctionLink() {
  return (
    <div>
      
      <AuctionHeader/>
      <AuctionLinkContainer>
        <AuctionLinkContainer2>
        <ImgBox>
        <img
          src="/Images/sheep.jpg"
          alt="product picture"
          
        />
       </ImgBox>
      <AuctionInfoBox>
        <h1>Product Name: </h1>
        <p>Product Description:</p>
        <h4> Starting product price</h4>
         
         <h3>Current Bid amount</h3>
        <BidBox>
          <TextField
          label="Enter Amount" 
          variant="outlined"
          />
          <Button type="submit">Bid Now</Button>
        
        </BidBox>
        <hr/>
        <h4>Auction ends in:</h4>
         <TextField
          label="Winner Is!!" 
          variant="outlined"
          />
        </AuctionInfoBox>
        </AuctionLinkContainer2>
      </AuctionLinkContainer>
    </div>
  )
}

export default AuctionLink

const AuctionLinkContainer = styled.div`
 text-align: "center";
 /* height: 100%;
 width: 100%; */

`
const AuctionLinkContainer2 = styled.div`
 align-items: "center";
 /* width: 100%; */
 display: flex;

 
`
const ImgBox = styled.div`
  /* height:500px;
  width: 500px; */

  > img {
    padding: 50px;
    margin-top: 100px;
    width:500px;
    height: 500px;
  }
`
const AuctionInfoBox = styled.div`
  /* height:50%;
  width: 50%; */
   padding: 300px;
    margin-top: -120px;

    > hr{
      margin-top: 20px;
    }
`
const BidBox = styled.div`
  display: flex;

  > button {
    background-color:#0a8d48;
    color: white;
  }
`
