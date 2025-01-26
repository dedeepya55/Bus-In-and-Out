const express = require('express');
const multer = require('multer');
const path = require('path');
const ProfileModel  =require('../../models/Iship_model/profileModel');
// Storage constraint
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// File filter constraint
const fileFilter = (req, file, cb) => {
    const fileType = /jpeg|jpg|png/;
    const result = fileType.test(path.extname(file.originalname).toLowerCase());
    if (result) {
        cb(null, true);
    } else {
        cb(new Error("Please upload a file in JPEG, JPG, or PNG format."), false);
    }
};

// Upload function -> winding up 3 constraints
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 }  // Limit: 1MB
}).single('file');

const FileUpload = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const fileUrl = req.file.filename;
        ProfileModel.findOneAndUpdate(
            { EmplyeeId: req.body.empid },
            { imagepath:fileUrl },
            // { new: true }
        )
        .then(() => res.status(201).json({ message: "Image uploaded successfully" }))
        .catch(error => res.status(500).json(error));
    });
};

// GET: Fetch profile image by EmployeeId
const profileup = async (req, res) => {
    try {
        const profession = await ProfileModel.aggregate([
            { $match: { EmplyeeId: "Id53dhw14q" } },
            { $project: { _id: 0, imagepath: 1 } }
        ]);
        return res.status(200).json({ profileupdate: profession });
    } catch (error) {
        return res.status(500).json(error);
    }
};
module.exports = {
    FileUpload,
    profileup
};
