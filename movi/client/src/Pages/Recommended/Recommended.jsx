import React from 'react';
import { Container } from '@mui/system';
import { Helmet } from 'react-helmet';
import Header from '../../Components/Header';
import './Recommended.css';

function Recommended() {
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
              height: '800px',
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
                  
                }}> SIT-COMS </p>
        </Container>
       
        <Container maxWidth = 'xl'
         style ={{
            float: 'right',
            backgroundColor: '#b9f1f8',
            width: '48%',
            height: '400px',
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
                  width: '200px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> DOCUMENTARIES </p>
        </Container> 
    </div>

    <Container maxWidth = 'xl'
         style ={{
            float: 'right',
            backgroundColor: '#b9f1f8',
            width: '48%',
            height: '390px',
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
                  
                }}> WILDCARD </p>
        </Container> 


  </div>

  
  );
}


export default Recommended;