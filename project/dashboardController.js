const mymodeldashboard = require('../../models/Iship_model/dashboardModel');

const Test1 = async (req, res) => {
    try {
        const { busNo } = req.body;

        // Get today's date
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        
        // Extract last two digits of the year for "yy" format
        const year = String(today.getFullYear()).slice(-4);
        
        // Format date as "dd-mm-yy"
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);
        // console.log(Formatted Date: ${formattedDate}); // Debugging purposes
        
        // Query the database using busNo and formatted date
        const busData = await mymodeldashboard.findOne({ busNo: busNo });

        if (busData) {
            // console.log(busData);
            return res.status(200).json(busData);
        } else {
            return res.status(404).json({ message: "Bus number not found or no data for today's date" });
        }
    } catch (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Error fetching data", error: err });
    }
};



module.exports = { busdashboard: Test1 };
