import React, { useState } from 'react';
import styles from '../css_files/location2.module.css'; // Importing the module

function BusDetail() {
  const [location, setLocation] = useState('');
  const [busDetails, setBusDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:9000/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      const data = await response.json();
      if (response.ok) {
        setBusDetails(data); // Store the response in state
        setError(''); // Clear any previous errors
      } else {
        setBusDetails(null); // Clear previous data
        setError(data.message || 'No data found for the location');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className={styles.busDetailsContainer}>
      {/* Search bar and button in one row */}
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Bus details as cards */}
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

export default BusDetail;
