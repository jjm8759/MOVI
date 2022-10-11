import axios from 'axios';

/**
 * Performs a GET http operation on a query URL
 * @returns The response in JSON format
 */
 const fetch = async (url) => axios.get(url)
 .then((response) => { return response.data })
 .catch((error) => console.error(error));

 export default fetch;