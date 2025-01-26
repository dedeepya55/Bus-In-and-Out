import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get passed state
import styles from '../css_files/location2.module.css';

function BusDetails() {
  const location = useLocation(); // Hook to access the passed state
  const { selectedLocation } = location.state || {}; // Extract selectedLocation from state
  const [busDetails, setBusDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedLocation) {
      handleSearch(selectedLocation);
    }
  }, [selectedLocation]);

  const handleSearch = async (location) => {
    const standardizedLocation = location.toUpperCase(); 
    try {
      const response = await fetch('http://localhost:9000/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: standardizedLocation }), 
      });
      const data = await response.json();
      if (response.ok) {
        setBusDetails(data);
        setError('');
      } else {
        setBusDetails(null);
        setError(data.message || 'No data found for the location');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className={styles.busDetailsContainer}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {busDetails && (
        <div className={styles.busDetailsList}>
          {busDetails.map((bus, index) => (
            <div key={index} className={styles.busCard}>
              <div className={styles.busNumberCircle}>
                <p className={styles.busNumber}>{bus.BusNo}</p>
              </div>
              <div className={styles.busInfo}>
                <p><strong>Place:</strong> {bus.Place}</p>
                <p><strong>Stops:</strong> {bus.Stops.join(', ')}</p>
                <p><strong>Driver Name:</strong> {bus.DriverName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusDetails;
