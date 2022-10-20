import React from 'react';
import { Container }  from '@material-ui/core/Container';
import SearchBar from './components/SearchBar';
import { Button } from '@mui/material';
import { Component } from 'react';


export default function Header() {
    return (
    <>
      style ={{
        backgroundColor: '#50dcee',
      }}
      <div>
        <Container maxWidth = 'xxl'
        style={{
          backgroundColor: '#d1f6fa',
          display: 'block',
          padding: '50px'
        }}>
        <div
          style = {{
            float: 'left',
            marginTop: '5px',
           
          }}>
        <SearchBar/>
        </div>  
        <div
          style = {{
            float: 'right',
            
          }}>
          <Button> Movies </Button> <Button> TV Shows </Button>
                <Button> Watch List </Button> <Button> My Account </Button>
        </div>
      </Container>
    </div> 
    </>
    );
}