import React from 'react';
// import { Container } from '@mui/system';
import { Card, CardMedia, CardContent, Typography, Grid, Container, Table } from '@mui/material';
import Header from '../../Components/Header/Header';
import { Helmet } from 'react-helmet';
import './Discover.css';
import api from '../../apiCall.js';
import { useState, useEffect } from 'react';

function Discover() {
  // Use the useState hook to manage the state of the movie data
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [hotMovies, setHotMovies] = useState([]);
  const [badMovies, setBadMovies] = useState([]);
  
  // Use the useEffect hook to fetch the movie data from the API when the
  // component mounts
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      await api.get('/recommended')
      .then(response => {
        setRecommendedMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    };

    const fetchHotMovies = async () => {
      await api.get("/title/list/?types=movie&sort_by=popularity_desc")
      .then(async response => {
        let hotMovies = response.data;
        hotMovies = hotMovies.slice(0, 3);
        hotMovies = await Promise.all(response.data.map(async movie => {
          let movieData = await api.get(`/title/${movie.id}/`);
          return movieData.data;
        }));
        setHotMovies(hotMovies);
      })
      .catch(error => {
        console.log(error);
      });
    };

    const fetchBadMovies = async () => {
      await api.get("/title/list/?types=movie&sort_by=popularity_asc")
      .then(async response => {
        let badMovies = response.data;
        badMovies = badMovies.slice(0, 3);
        badMovies = await Promise.all(response.data.map(async movie => {
          let movieData = await api.get(`/title/${movie.id}/`);
          return movieData.data;
        }));
        setBadMovies(badMovies);
      })
      .catch(error => {
        console.log(error);
      });
    };

    fetchRecommendedMovies()
    fetchHotMovies()
    fetchBadMovies()
  }, []);

  // Use the map() method to iterate over the array of movies and generate
  // an array of <Card> components
  const recommendedCards = recommendedMovies.map((movie, index) => (
    <Card key={index}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={movie.title}
        height="300"
        image={movie.poster}
        title={movie.title}
      />
    </Card>
  ));

  const hotCards = hotMovies.map((movie, index) => (
    <Card key={index}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={movie.title}
        height="300"
        image={movie.poster}
        title={movie.title}
      />
    </Card>
  ));

  const badCards = badMovies.map((movie, index) => (
    <Card key={index}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={movie.title}
        height="300"
        image={movie.poster}
        title={movie.title}
      />
    </Card>
  ));

  return ( 
  
  <div>
    <Helmet bodyAttributes={{style: 'background-color : #50dcee'}}/>
    <div >
        <Header/>
    </div> 
  
    <div className = "PageLabelStyle">
    <Container>
            <p className = "PageLabelParagraph"> DISCOVER </p>
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
              overflowY: 'scroll',
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
                  
                }}> RECOMMENDED </p>

          <Table container spacing={3}>
            {recommendedCards}
          </Table>
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
            overflowY: 'scroll',
          }}>
            <p
                style= {{
                  display: 'flex',
                  backgroundColor: '#fff',
                  padding: '15px',
                  borderRadius: '50px',
                  width: '120px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> WHAT'S HOT </p>

          <Table container spacing={3}>
            {hotCards}
          </Table>
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
            overflowY: 'scroll',
          }}>
            <p
                style= {{
                  display: 'flex',
                  backgroundColor: '#fff',
                  padding: '15px',
                  borderRadius: '50px',
                  width: '120px',
                  fontColor: '#b9f1f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}> WHAT'S NOT </p>

          <Table container spacing={3}>
            {badCards}
          </Table>
        </Container> 


  </div>
  
  );
}

export default Discover;