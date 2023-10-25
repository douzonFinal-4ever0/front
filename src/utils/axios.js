import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defHeader = {};

const clientStateDefinition = () => {
  return typeof window !== 'undefined' ? 'BROWSER' : 'SERVER';
};

const setToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    defHeader.Auth = token;
  }
};

const request = axios.create({
  timeout: 10000,
  headers: defHeader
});
 
const Axios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setToken();
        const response = await axios.get('/your-api-endpoint'); // 
        setResponse(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Axios;
