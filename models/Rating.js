import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
    default: 0,    // Maximum rating value allowed (assuming a rating scale from 0 to 5)
  },
  count: {
    required: true,
    type: Number,
  },
  rating_sum : {
    required: true,
    type: Number,
  }
});

export const Rating = mongoose.model("rating", schema);