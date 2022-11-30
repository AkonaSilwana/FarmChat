import React from 'react'
import { Box } from "@material-ui/core";
import { TextFieldElement } from 'react-hook-form-mui';
import AuctionHeader from './AuctionHeader';
import styled from 'styled-components';
import Button from "@mui/material/Button";

function AuctionLink() {
  return (
    <div>
      <AuctionHeader/>
      <AuctionLinkContainer>
        <ImgBox>
        <img
          src="/Images/sheep.jpg"
          alt="product picture"
        />
       </ImgBox>
      <AuctionInfoBox>
        <h1>Product Name</h1>
        <p>Product Description</p>
        <h4> Starting product price</h4>
         
         <h3>Current Bid amount</h3>
        <BidBox>
          <TextFieldElement
           name="BidAmount"
              label="Enter Amount"
              variant="outlined"
          />
          <Button type="submit">Bid Now</Button>
        </BidBox>
        <h4>Auction ends in:</h4>
        </AuctionInfoBox>
      </AuctionLinkContainer>
    </div>
  )
}

export default AuctionLink

const AuctionLinkContainer = styled.div`
 text-align: "center";
 height: 100%;
 width: 100%;
 display: flex;
`
const ImgBox = styled.div`
  height:50%;
  width: 50%;
`
const AuctionInfoBox = styled.div`
  height:50%;
  width: 50%;
`
const BidBox = styled.div`
  display: flex;
`
