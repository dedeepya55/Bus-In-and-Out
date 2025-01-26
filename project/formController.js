const express = require('express');
const Myloc = require('../../models/Iship_model/locationModel.js'); 

const Test1 = async (req, res) => {
  const { BusNo,DriverName, place, stops } = req.body; // Extract BusNo, location, place, and stops from request body

  // Validate if all required fields are provided
  console.log(DriverName);
  if (!BusNo || !DriverName || !place || !stops) {
    return res.status(400).json({ message: "Please provide all required fields: BusNo, location, place, and stops" });
  }

  try {
    // Step 1: Check if BusNo already exists in the database
    const existingResult = await Myloc.findOne({ BusNo });

    if (existingResult) {
      return res.status(400).json({ message:` BusNo ${BusNo} already exists. Cannot add duplicate entry.` });
    }

    // Step 2: If BusNo is not found, insert the new data into the database
    const newLocationData = new Myloc({
      BusNo, // Use the BusNo from the request body
      Place: place, // Use the provided place
      Stops: stops, // Use the provided stops
      DriverName: DriverName // Use the provided location
    });

    // Save the new data to the database
    const savedData = await newLocationData.save();

    // Step 3: Return the success response with the inserted data
    return res.status(201).json({ message: "Bus data successfully inserted", data: savedData });

  } catch (err) {
    // Handle any errors that occur during the process
    return res.status(500).json({ message: "Error saving bus data to the database", error: err });
  }
};

exports.busform = Test1;