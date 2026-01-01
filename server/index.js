import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import Booking from './models/Booking.js';
import Hotel from './models/Hotel.js';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotel';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hotel Booking API');
});

// Booking endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, checkin, checkout } = req.body;
    const booking = new Booking({ name, email, checkin, checkout });
    await booking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(400).json({ error: 'Booking failed', details: err.message });
  }
});

// Sample hotels endpoint (static data for now)
app.get('/api/hotels', async (req, res) => {
  // In production, fetch from DB. Here, return static sample data.
  res.json([
    {
      name: 'LuxeStay Hotel',
      description: 'A modern, premium hotel in the city center.',
      location: 'Downtown',
      images: [],
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Fine Dining'],
      pricePerNight: 220
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
