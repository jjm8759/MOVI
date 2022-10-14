import React from 'react';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import SearchBar from './components/SearchBar';
import { Helmet } from 'react-helmet';


function Discover() {
  return ( 
   
  <div>
    <Helmet bodyAttributes={{style: 'background-color : #50dcee'}}/>
  <div
      style ={{
        backgroundColor: '#50dcee',
      }}> 
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
  
    

    <div 
      style = {{
        display: 'block',
        backgroundColor: 'blue',
        marginTop: '10px'
      }}>
        
        <Container maxWidth = 'xl'
          style ={{
              float: 'left',
              backgroundColor: '#b9f1f8', 
              width: '48%',
              height: '500px',
              paddingLeft: 10,
              border: 'clear',
              borderRadius: 40,
              marginBottom: 10,
              marginLeft: 10,
          
              }}>
                <p
                style= {{
                  display: 'flex',
                  backgroundColor: '#fff',
                  padding: '15px',
                  borderRadius: '50px',
                  width: '90px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> What's Hot </p>
        </Container>
       
        <Container maxWidth = 'xl'
         style ={{
            float: 'right',
            backgroundColor: '#b9f1f8',
            width: '48%',
            height: '500px',
            paddingLeft: 10,
            border: 'clear',
            borderRadius: 40,
            marginBottom: 10,
            marginRight: 10,
          }}>
            <p
                style= {{
                  display: 'flex',
                  backgroundColor: '#fff',
                  padding: '15px',
                  borderRadius: '50px',
                  width: '90px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> What's Not </p>
        </Container> 
    </div>
    
  <div>
   <Container maxWidth = "xxl"
          style ={{
            float: 'left',
            backgroundColor: '#b9f1f8', 
            width: '98%',
            height: '300px',
            paddingLeft: 10,
            border: 'clear',
            borderRadius: 40,
            borderPadding: '10px',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            
          }}>
            <p
                style= {{
                  display: 'flex',
                  backgroundColor: '#fff',
                  padding: '15px',
                  borderRadius: '50px',
                  width: '100px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> Coming Soon </p>
    </Container>
  </div>
  </div>
  </div>
  
  );
}

export default Discover;