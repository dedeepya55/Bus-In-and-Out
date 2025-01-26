const express = require('express');
const nodemailer = require('nodemailer');
const profileModel = require('../../models/Iship_model/profileModel');

const mailsender = async (req, res) => {
    const { Email } = req.body; 
    // console.log(Email);

    try {
        const result = await profileModel.aggregate([
            {
                $match: { 
                    Email: Email
                }
            },
            {
                $project: {
                    _id: 0,
                    password: 1
                }
            }
        ]);

        const password = result.length > 0 ? result[0].password : "Password not found";
        
        console.log("Fetched Password:", password);

        const Transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dedeepyakalavakuri@gmail.com',
                pass: "ekqb bvxi lvwq ntzs"
            }
        });

        const MailOptions = {
            from: 'dedeepyakalavakuri@gmail.com',
            to: Email,
            subject: "Your Password",
            text: `Your password is: ${password}`,
        };

        Transporter.sendMail(MailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).json(err);
            }
            return res.status(200).json("Mail was sent");
        });
    } catch (err) {
        console.log("Error in aggregation or email sending:", err);
        res.status(500).json("Internal Server Error");
    }
};

exports.MailSender = mailsender;