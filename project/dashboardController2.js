const express = require('express');
const mymodeldashboard = require('../../models/Iship_model/dashboardModel');

const Test2 = async (req, res) => {
    try {
        const { busNo ,date } = req.body;
        // const {date} = req.body;
        const busData = await mymodeldashboard.findOne({ busNo: busNo, date:date });

        if (busData) {
            console.log(busData);
            return res.status(200).json(busData);
        } else {
            return res.status(404).json({ message: "Bus number not found or no data for today's date" });
        }
    } catch (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Error fetching data", error: err });
    }
};

module.exports = { busdashboard2: Test2 };