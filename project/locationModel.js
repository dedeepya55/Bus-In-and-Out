const express =require('express');
const mongoose = require('mongoose');

const BusLocDetails = new mongoose.Schema({
    BusNo: {
        type: Number
    },
    Place: {
        type: String
    },
    Stops: {
        type: Array 
    },
    DriverName: {
        type: String
    }
});

module.exports = mongoose.model("BusLocDetails", BusLocDetails);
