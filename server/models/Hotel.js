import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  images: [String],
  amenities: [String],
  pricePerNight: Number
});

export default mongoose.model('Hotel', hotelSchema);
