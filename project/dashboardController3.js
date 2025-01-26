const express = require('express');
const mymodeldashboard = require('../../models/Iship_model/dashboardModel');

const busdashboard3 = async (req, res) => {
    try {
        const { fromDate, toDate, busNumber } = req.body;
        console.log(fromDate, toDate, busNumber);

        // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd' for proper sorting
        const formattedFromDate = fromDate.split('-').reverse().join('-'); // 'yyyy-mm-dd'
        const formattedToDate = toDate.split('-').reverse().join('-');     // 'yyyy-mm-dd'

        // Ensure busNumber is a number
        const busNo = Number(busNumber);  // Convert busNumber to a number

        // Aggregation pipeline to convert 'dd-mm-yyyy' to Date and filter by the range
        const results = await mymodeldashboard.aggregate([
            {
                // Add fields with converted dates
                $addFields: {
                    dateConverted: {
                        $dateFromString: {
                            dateString: {
                                $concat: [
                                    { $substr: ['$date', 6, 4] }, '-',
                                    { $substr: ['$date', 3, 2] }, '-',
                                    { $substr: ['$date', 0, 2] }
                                ]
                            },
                            format: '%Y-%m-%d'
                        }
                    }
                }
            },
            {
                // Filter for dates within the range and match the bus number
                $match: {
                    dateConverted: {
                        $gte: new Date(formattedFromDate),
                        $lte: new Date(formattedToDate)
                    },
                    busNo: busNo  // Match busNo as a number
                }
            },
            {
                // Project original fields (inTime, outTime, etc.)
                $project: {
                    date: 1,
                    inTime: 1,
                    outTime: 1
                }
            }
        ]);

        console.log("result:", results);

        // Convert 'yyyy-mm-dd' back to 'dd-mm-yyyy' for the x-axis
        const datesArray = [];
        const inTime = [];
        const outTime = [];

        const startDate = new Date(formattedFromDate);
        const endDate = new Date(formattedToDate);
        
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const formattedDate = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
            datesArray.push(formattedDate);
            inTime.push(null);  // Initialize as null
            outTime.push(null); // Initialize as null
        }

        // Map results to the date array
        results.forEach(entry => {
            const dbDate = entry.date; // Date is already in 'dd-mm-yyyy' format in the original data
            const index = datesArray.indexOf(dbDate);
            if (index !== -1) {
                inTime[index] = timeToMinutes(entry.inTime);
                outTime[index] = timeToMinutes(entry.outTime);
            }
        });

        console.log(inTime, outTime);

        // Send the data back in the desired format
        return res.status(200).json({ dates: datesArray, inTime, outTime });
    } catch (err) {
        console.error("Error fetching graph data:", err);
        return res.status(500).json({ message: "Error fetching graph data", error: err });
    }
};

// Helper function to convert "hh:mm" to total minutes
const timeToMinutes = (time) => {
    if (!time) return null; // Handle cases with no time
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convert to total minutes
};

module.exports = { busdashboard3 };
