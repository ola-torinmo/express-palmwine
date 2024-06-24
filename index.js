// CommonJS requires using `require`
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Email = require('./email');
const transporter = require('./mailer');

// Configure dotenv to read environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI || 'your-mongodb-connection-string';

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
app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' });
});

// Route for sending email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const to = 'palmwineandfriendsng@gmail.com';
  const subject = 'This user will show up!';
  const body = email;

  try {
    const newEmail = new Email({ to, subject, body });
    await newEmail.save();

    const mailOptions = {
      from: 'palmwineandfriendsng@gmail.com',
      to: 'palmwineandfriendsng@gmail.com',
      subject: 'This user just subscribed',
      text: body,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
