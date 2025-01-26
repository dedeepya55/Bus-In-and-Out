const express = require('express');
const mymodeldashboard = require('../../models/Iship_model/dashboardModel');

const monthlyAnalysis = async (req, res) => {
    try {
        const { year, busNumber } = req.body;
        console.log(`Year: ${year}, BusNumber: ${busNumber}`); // Fixed string interpolation

        const results = await mymodeldashboard.aggregate([ // Use correct model name
            {
                // Match records for the specified year and bus number
                $match: {
                    busNo: Number(busNumber), // Assuming busNo is in number format
                    date: { $regex: `^\\d{2}-\\d{2}-${year}$` } // Correct regex syntax
                }
            },
            {
                // Add a new field for the month and convert time to total minutes
                $addFields: {
                    month: { $substr: ['$date', 3, 2] }, // Extract month from the date
                    inTimeMinutes: {
                        $let: {
                            vars: {
                                timeParts: { $split: ['$inTime', ':'] }
                            },
                            in: {
                                $add: [
                                    { $multiply: [{ $toInt: { $arrayElemAt: ['$$timeParts', 0] } }, 60] }, // Convert hours to minutes
                                    { $toInt: { $arrayElemAt: ['$$timeParts', 1] } } // Add minutes
                                ]
                            }
                        }
                    },
                    outTimeMinutes: {
                        $let: {
                            vars: {
                                timeParts: { $split: ['$outTime', ':'] }
                            },
                            in: {
                                $add: [
                                    { $multiply: [{ $toInt: { $arrayElemAt: ['$$timeParts', 0] } }, 60] }, // Convert hours to minutes
                                    { $toInt: { $arrayElemAt: ['$$timeParts', 1] } } // Add minutes
                                ]
                            }
                        }
                    }
                }
            },
            {
                // Group by month to calculate averages
                $group: {
                    _id: "$month",
                    avgInTime: { $avg: "$inTimeMinutes" }, // Use the new minute conversion
                    avgOutTime: { $avg: "$outTimeMinutes" } // Use the new minute conversion
                }
            },
            {
                // Sort by month
                $sort: { _id: 1 }
            }
        ]);

        console.log(results);
        const formattedData = {
            dates: results.map(result => result._id),
            inTime: results.map(result => result.avgInTime),
            outTime: results.map(result => result.avgOutTime),
        };

        return res.status(200).json(formattedData);
    } catch (err) {
        console.error("Error fetching monthly analysis:", err);
        return res.status(500).json({ message: "Error fetching monthly analysis", error: err });
    }
};

module.exports = { monthlyAnalysis };
