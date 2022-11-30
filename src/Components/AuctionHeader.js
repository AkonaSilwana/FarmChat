import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

function AuctionHeader() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      <h1>WELCOME TO THE FARM MARKET AUCTION</h1>
    
       <HeaderRight>
       <HeaderAvatar
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <h3> {user.displayName}</h3>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default AuctionHeader;

const HeaderRight = styled.div`
  flex: 0.3;
  display:flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
const HeaderContainer = styled.div`
display: flex;
position: fixed;
width: 100%;
align-items: center;
justify-content: space-between;
padding: 10px 0;
background-color: #f8f8f8 ;
color: var(--farm-color);
`;

const HeaderAvatar = styled(Avatar)`
 cursor: pointer;

 :hover {
  opacity: 0.8;
 }
`;