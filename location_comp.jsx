import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css_files/location.module.css';
import samalkot_image from '../../assets/project_iship/samalkota_image.jpg';
import bus from '../../assets/project_iship/bus_image1.jpg';
import kakinada_image from '../../assets/project_iship/kakinada_image.jpg';
import rajahmundrry_image from '../../assets/project_iship/rajahmundrry_image.jpeg';
import tuni_image from '../../assets/project_iship/tuni_image2.jpeg';

const Location = ({ onLocationClick }) => {
  const navigate = useNavigate();

  const handleClick = (loc) => {
    onLocationClick(loc); // Optional: This can be used to update the parent component state if needed
    navigate('/bus-details', { state: { selectedLocation: loc } }); // Navigate to BusDetails with selected location in state
  };

  const locations = ["SAMALKOTA", "RAJAHMUNDRY", "KAKINADA", "TUNI", "SAMALKOTA", "RAJAHMUNDERY", "KAKINADA", "TUNI", "PEDDAPURAM", "SAMALKOTA", "RAJAHMUNDRY", "PEDDAPURAM"];
  const images = [samalkot_image, rajahmundrry_image, kakinada_image, tuni_image, bus, bus, bus, bus, bus, bus, bus, bus];

  return (
    <div className={styles.locationContainer}>
      <div className={styles.locempty}></div>
      <div className={styles.lochead}>LOCATION</div>
      <div className={styles.locempty1}></div>
      <div className={styles.allloc}>
        {locations.map((loc, index) => (
          <div 
            key={index} 
            className={styles.loc1}
            onClick={() => handleClick(loc)} // Handle click and navigate
          >
            <div className={styles.locpic}>
              <img src={images[index]} alt={loc} className={styles.locImage} />
            </div>
            <div className={styles.locname}>{loc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
