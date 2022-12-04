import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { Link } from "@mui/material";

function ListOfAuctions({ clickOpen, getOpen }) {
  const theme = useTheme();
  const defaultMaterialTheme = createTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const handleOpen = () => {
    getOpen(true);
  };
  const onClickClose = () => {
    getOpen(false);
  };
  const [auctionData, setData] = useState([]);
  useEffect(() => {
    let dataAuction = [];
    db.collection("auctions").onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        dataAuction.push(doc.data());
        return doc.data();
      })
    );
    setData(dataAuction);
  }, []);
    
  
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen} sx={{ color: "white"}}>
        List Of Auctions
      </Button>
      <Dialog open={clickOpen} onClose={onClickClose} fullScreen={fullScreen}>
        <DialogContent>
          <AuctionContainer>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Available Auctions"
                columns={[
                  { title: "ID", field: "auctionId", render:rowData =><Link href={`/AuctionLink?id=${rowData.auctionId}`} target="_blank">{rowData.auctionId}</Link> },
                  { title: "Auction Title", field: "auctionTitle" },
                  { title: "Auction Date", field: "auctionDate" },
                  { title: "Start Time", field: "auctionStartTime" },
                  { title: "Start Time", field: "auctionEndTime" },
                   { title: "Action",render:rowData =><Link href={`/AuctionLink?id=${rowData.auctionId}`} target="_blank">Open Auction</Link>  }
                ]}
                // data={auctionData}
                data={[
                   {auctionId:1, auctionTitle: 'Mehmet', auctionDate: '10/12/2022', auctionStartTime: '8am', auctionEndTime: '2pm' },
                    {auctionId:2, auctionTitle: 'sheeps', auctionDate: '20/12/2022', auctionStartTime: '8am', auctionEndTime: '2pm' },
                    {auctionId:3, auctionTitle: 'cows', auctionDate: '15/12/2022', auctionStartTime: '8am', auctionEndTime: '2pm' },
                ]}
                options={{
                  search: true,
                }}
              />
            </ThemeProvider>
          </AuctionContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListOfAuctions;

const AuctionContainer = styled.div`
  padding: 10px;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
`;