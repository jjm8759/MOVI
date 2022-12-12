import React from 'react';
import { Container } from '@mui/system';
import Header from './Header';
import { Helmet } from './react-helmet';


function Discover() {
  return ( 
   
  <div>
       <Helmet bodyAttributes={{style: 'background-color : #50dcee'}}/>
      <div >
        <Header/>
      </div> 
  
      <div className = "PageLabelStyle">
        <Container>
          <p className = "PageLabelParagraph"> RECOMMENDED </p>
        </Container>
      </div>
  
    <div >
    <Container maxWidth = "xxl"
          style ={{
            float: 'left',
            backgroundColor: '#fff', 
            width: '98%',
            height: '60px',
            paddingLeft: 10,
            border: 'clear',
            borderRadius: 40,
            borderPadding: '10px',
            marginTop: '10px',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            
          }}>
            <p
                style= {{
                  display: 'flex',
                  marginLeft: '480px',
                  backgroundColor: '#fff',
                  borderRadius: '50px',
                  width: '100px',
                  position: 'center',
                  fontColor: '#b9f1f8',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> DISCOVER </p>
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
  );
}

export default Discover;