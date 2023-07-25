import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  mobile_number:{
    required: true,
    type: Number,
  },
  address: {
    required: true,
    type: String
  },
  image: {
    type: Buffer, // Store the image as binary data (Buffer) in MongoDB
    contentType: String, // Store the image content type (e.g., "image/jpeg", "image/png")
  },
  latitude: {
    type :Number
  },
  longitude: {
    type :Number
  },
  
 
});

export const Customer = mongoose.model("Customer", schema);