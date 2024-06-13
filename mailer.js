const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	user: 'palmwineandfriendsng@gmail.com',
	pass: 'topnxdkzvleoerbw',
	},
});

module.exports = transporter;