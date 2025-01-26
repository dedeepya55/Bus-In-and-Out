import React, { useState } from 'react';
import "../css_files/addnewbus.css";

const TrainingForm = () => {
  const [formData, setFormData] = useState({
    BusNo: '',
    DriverName: '',
    // location: '',
    place: '',
    stops: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      const response = await fetch('http://localhost:9000/newbusform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // Handle the response from the backend
      if (response.ok) {
        console.log('Form submitted successfully:', data);
        alert("Data added successfully");

        // Clear the form after successful submission
        setFormData({
          BusNo: '',
          DriverName: '',
          // location: '',
          place: '',
          stops: ''
        });
      } else {
        console.error('Error submitting form:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register New Bus</h2>
      <form onSubmit={handleSubmit} className='busform'>
        <div className="form-group">
          <label>Bus Number</label>
          <input
            type="number"
            name="BusNo"
            value={formData.BusNo}
            onChange={handleChange}
            placeholder="Enter Bus Number"
          />
        </div>

        <div className="form-group">
          <label>Driver Name</label>
          <input
            type="text"
            name="DriverName"
            value={formData.DriverName}
            onChange={handleChange}
            placeholder="Enter Driver Name"
          />
        </div>

        <div className="form-group">
          <label>Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter Place"
          />
        </div>

        <div className="form-group">
          <label>Stops</label>
          <input
            type="text"
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            placeholder="Enter Stops"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default TrainingForm;
