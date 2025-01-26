const express = require('express');
const mongoose = require('mongoose');

const busdashboard = new mongoose.Schema({
    busNo: {
        type: Number
    },
    date: {
        type: String
    },
    inTime: {
        type: String
    },
    outTime: {
        type: String
    },
    studentsCount: {
        type: Number
    },
    location: {
        type: String
    },
    driverName: {
        type: String
    },
    driverPhoneNumber: {
        type: Number
    },
    studentPresentCount: {
        type: Number
    },
    route:{
        type:String,
    }
});

module.exports = mongoose.model("busdashboard",busdashboard);
