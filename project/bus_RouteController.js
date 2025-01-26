const mymodeldashboard = require('../../models/Iship_model/dashboardModel');

// Get all routes
const getRoutes = async (req, res) => {
  try {
    // Retrieve the bus routes

    const { busNo} = req.body;
    const routedata = await mymodeldashboard.aggregate([
      {
        "$match": {
          "busNo": 128
        }
      },
      {
        "$project": {
          "_id": 0,
          "busNo":1,
          "Route": 1
        }
      }
    ]);

    // Map through the route data to create a structured response
    const routebusdata = routedata.map(item => ({
      bus_No: item.bus_No,  // Bus number
      locations: item.Route  // Array of locations
    }));

    res.status(200).json({ routes: routebusdata });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getRoutes };
