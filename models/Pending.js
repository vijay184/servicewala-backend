import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sp_email: {
    type: String,
    required: true,
  },
  cust_email: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  mobile_number:{
    required: true,
    type: Number,
  },
  address: {
    required: true,
    type: String
  },
  latitude: {
    required:true,
    type :Number
  },
  longitude: {
    required:true,
    type :Number
  }
 
});

export const Pending = mongoose.model("pending", schema);