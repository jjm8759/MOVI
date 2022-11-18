import { useState, useEffect } from "react";
import axios from "axios";


const parseJson = async response => {
    const text = await response.text()
    try{
      const json = JSON.parse(text)
      return json
    } catch(err) {
      throw new Error("Did not receive JSON, instead received: " + text)
    }
  }

const useFetchData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get("http://localhost:5000/user/email")
                .then(parseJson());
                setData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    return {
        data,
        loading,
    };
};

export default useFetchData;