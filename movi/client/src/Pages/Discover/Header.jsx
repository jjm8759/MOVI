import React from 'react';
import { Container }  from 'react';
import SearchBar from './SearchBar';
import { Button } from '@mui/material';
import './Header.css';



const Header = () => (
  <h1 className = "HeaderStyle" >
    
    <div className = "LeftStyle">
      <Container >
        <SearchBar/>
      </Container>
    </div>

    <div className = "RightStyle">
      <Container>
        <Button> Discover </Button> <Button> Recommended </Button>
              <Button> Watch </Button> <Button> My Account </Button>
      </Container>
    </div>
  

  </h1>
);

export default Header;