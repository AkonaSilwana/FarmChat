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
        dataAuction.push({ id: doc.id, data: doc.data() });
        return doc.data();
      })
    );
    setData(dataAuction);
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen} sx={{ color: "white" }}>
        List Of Auctions
      </Button>
      <Dialog open={clickOpen} onClose={onClickClose} fullScreen={fullScreen}>
        <DialogContent>
          <AuctionContainer>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Available Auctions"
                columns={[
                  {
                    title: "ID",
                    field: "id",
                    render: (rowData) => (
                      <Link href={`/AuctionLink/${rowData.id}`}>
                        {rowData.id}
                      </Link>
                    ),
                  },
                  { title: "Auction Title", field: "data.auctionTitle" },
                  { title: "Auction Date", field: "data.auctionDate" },
                  { title: "Start Time", field: "data.auctionStartTime" },
                  { title: "Start Time", field: "data.auctionEndTime" },
                  {
                    title: "Action",
                    render: (rowData) => (
                      <Link href={`/AuctionLink/${rowData.id}`}>
                        Open Auction
                      </Link>
                    ),
                  },
                ]}
                data={auctionData}
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