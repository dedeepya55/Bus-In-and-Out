const Myloc = require('../../models/Iship_model/locationModel.js'); 

const Test1 = async (req, res) => {
  const { location } = req.body; 

  if (!location) {
    return res.status(400).json({ message: "Please provide a location to search" });
  }

  try {
    const lowerCaseLocation = location.toLowerCase(); 

    const result = await Myloc.find({
      $or: [
        { Place: { $regex: new RegExp(`^${lowerCaseLocation}$`, 'i') } }, 
        { Stops: { $regex: new RegExp(lowerCaseLocation, 'i') } } 
      ]
    });

    if (result.length === 0) {
      return res.status(404).json({ message: `No data found for location: ${location}` });
    }

    return res.status(200).json(result); 
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving data", error: err });
  }
};

exports.iship = Test1;


// const Myloc = require('../../models/Iship_model/locationModel.js'); 

// const insertLocation = async (req, res) => {
//   const { Place, Stops } = req.body; 

//   // Validate request body
//   if (!Place || !Stops) {
//     return res.status(400).json({ message: "Please provide both Place and Stops to insert" });
//   }

//   try {
//     // Create a new location document
//     const newLocation = new Myloc({
//       Place,
//       Stops,
//     });

//     // Save the new location to the database
//     const savedLocation = await newLocation.save();

//     return res.status(201).json({
//       message: "Location added successfully",
//       data: savedLocation,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Error inserting data", error: err });
//   }
// };

// exports.insertLocation = insertLocation;
