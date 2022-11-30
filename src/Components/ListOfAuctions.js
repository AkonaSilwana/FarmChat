import React from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import MaterialTable from 'material-table';
import { useTheme } from "@mui/material/styles";
import {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function ListOfAuctions({ clickOpen, getOpen }) {
    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const handleOpen = () => {
    getOpen(true);
  };

  const onClickClose = () => {
    getOpen(false);
  };
  const rawData= [
    {
      aucName:'Sheep Sale',
      prodName: 'sheep',
      date: '15/12/2022',
      startTime:'08 am',
      endTime:'18pm'
    },
    {
      aucName:'Cow Sale',
      prodName: 'Cow',
      date: '20/12/2022',
      startTime:'10 am',
      endTime:'8pm'
    },
    {
      aucName:'pig Sale',
      prodName: 'pig',
      date: '25/12/2022',
      startTime:'10 am',
      endTime:'1pm'
    }
    
  ]
  const [tableData, setTableData] = useState(rawData)
  return (
    <div>
       
        <Button variant="outlined" onClick={handleOpen}>
        List Of Auctions
      </Button>
      <Dialog open={clickOpen} onClose={onClickClose} fullScreen={fullScreen}>
        <DialogTitle> List Of Auctions</DialogTitle>
        <DialogContent>
            <AuctionContainer>
            <table>
                
    <thread>
      <InputFieldStyle> 
      <tr>
        <th>Auction Name</th>
        <th>Product Name</th>
        <th>Auction Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Action</th>
      </tr>
      </InputFieldStyle> 
    </thread>
    
    <tbody>
      {
        tableData.map (rowData =>(
             
          <tr>
            <InputFieldStyle>
            <td>{rowData.aucName}</td>
            <td>{rowData.prodName}</td>
            <td>{rowData.date}</td>
            <td>{rowData.startTime}</td>
            <td>{rowData.endTime}</td>
            <td>
              <Link path='/AuctionLink'>
              <button>Open Auction</button>
              </Link>
            </td>
            </InputFieldStyle>
          </tr>
          
        ))
      }
    </tbody>
    
   </table>
      </AuctionContainer>      
     
     </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default ListOfAuctions

const AuctionContainer = styled.div`
padding: 10px;
margin: 0;
box-sizing: border-box;
width: 100%;
`
const InputFieldStyle = styled.div`
border-bottom: 1px solid #ccc;
padding: 10px 20px;
text-align: left;
`