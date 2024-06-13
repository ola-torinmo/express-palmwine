import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const mongoose = require('mongoose');
// const express = require('express');
const Email = require('./email');
const transporter = require('./mailer');
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
const uri ='mongodb+srv://satori:Satori123@cluster0.8a2avlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Basic route
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


app.use(cors());
app.get('/', async(req, res) => {
    res.status(200).json({message: "success"})
})
app.post('/send-email', async (req, res) => {
    console.log(req.body)
	const to = 'palmwineandfriendsng@gmail.com';
	 const subject = "This user will show up!";
	 const body = req.body.email;
	try {
	// const { to, subject, body } = req.body;
	
	const email = new Email({ to, subject, body });
	await email.save();
	// palmwineandfriendsng@gmail.com
	const mailOptions = {
		from: 'palmwineandfriendsng@gmail.com',
		to: 'palmwineandfriendsng@gmail.com',
		subject: "This user just subscribed",
		text: body,
	};

	await transporter.sendMail(mailOptions);
	
	res.status(200).json({ message: 'Email sent successfully.' });
	} catch (error) {
	console.error('Error sending email:', error);
	res.status(500).json({ error: 'An error occurred while sending the email.' });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});