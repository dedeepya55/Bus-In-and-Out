const express = require('express');
const Route = express.Router();
const EntireController4 = require("../../Controllers/Iship_controller/dashboardController");
const EntireController5 = require("../../Controllers/Iship_controller/dashboardController2");
const EntireController6 = require("../../Controllers/Iship_controller/dashboardController3");
const EntireController7 = require("../../Controllers/Iship_controller/dashboardController4");
const routeController = require('../../Controllers/Iship_controller/bus_RouteController');
const EntireController3 = require("../../Controllers/Iship_controller/locationController");
const EntireProject=require("../../Controllers/Iship_controller/home_page_dashboard_controller");
const EntireProfileController=require("../../Controllers/Iship_controller/profileController");
const EntireProfileImageController=require("../../Controllers/Iship_controller/image_backendController")
const EntireControllerform=require('../../Controllers/Iship_controller/formController');
const EntireControllerLogin=require('../../Controllers/Iship_controller/LoginController');
const SendMail=require('../../Controllers/Iship_controller/mailSend');

Route.post("/bus", EntireController4.busdashboard);
Route.post("/bus-calendar", EntireController5.busdashboard2);
Route.post("/bus-graph", EntireController6.busdashboard3);
Route.post("/bus-monthly-analysis", EntireController7.monthlyAnalysis);
Route.get('/routes', routeController.getRoutes);
Route.post("/dummy", EntireController3.iship); 
Route.get("/homepagedashboard",EntireProject.proj);
Route.get("/profile-api",EntireProfileController.prof);
Route.get("/profileupload",EntireProfileImageController.profileup);
Route.post("/upload",EntireProfileImageController.FileUpload);
// Route.post("/upload", EntireController.FileUploaded);
Route.post("/newbusform",EntireControllerform.busform);
// Route.post("/register",EntireControllerLogin.registerUser);
Route.post("/login",EntireControllerLogin.loginUser);
Route.post("/send-mail",SendMail.MailSender);

module.exports = Route;