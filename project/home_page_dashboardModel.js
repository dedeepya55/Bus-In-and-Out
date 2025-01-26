const express=require('express');
const mongoose=require('mongoose');
const BusData=new mongoose.Schema({
    busNo:{
        type:Number,
        required:true
    },
    timein:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("BusData",BusData);