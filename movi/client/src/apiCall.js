import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-type' : 'application/json'
    },
  });

export default api;
