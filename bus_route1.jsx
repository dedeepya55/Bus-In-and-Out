import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusTimeline from './bus_route';

const App = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch routes from the server
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:9000/routes');
        setRoutes(response.data.routes);  // Access the correct part of the response
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError('Failed to fetch routes. Please try again later.');
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div>
      <h1>Bus Route Timeline</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <BusTimeline routes={routes} />
      )}
    </div>
  );
};

export default App;
