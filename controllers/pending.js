import { Pending } from "../models/Pending.js";
import ErrorHandler from "../middlewares/error.js";

export const getPending = async (req, res) => {
  try {
    const {sp_email} = req.query;
    let pendingRequest = await Pending.find({ sp_email });
    res.status(200).json({
        success: true,
        pendingRequest
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

};

export const getOnePending = async (req, res) => {
  try {
    const { sp_email, cust_email } = req.query;
    let pendingRequest = await Pending.find({ sp_email, cust_email });
    res.status(200).json({
      success: true,
      pendingRequest,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const setPending = async (req, res) => {
    try {
      const { sp_email,cust_email,name,mobile_number,address,latitude,longitude } = req.body;
      let pendingRequest = await Pending.findOne({ sp_email,cust_email });

    if (!pendingRequest) {
        pendingRequest = await Pending.create({sp_email,cust_email,name,mobile_number,address,latitude,longitude});
    }
      await pendingRequest.save();

     return res.status(200).json({ message:"Pending Request updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const deletePending = async (req, res) => {
    try {
      const { sp_email, cust_email } = req.query;
      let pendingRequest = await Pending.findOne({ sp_email, cust_email });
  
      if (pendingRequest) {
        await Pending.deleteOne({ sp_email, cust_email });
      }
  
      return res.status(200).json({ message: "Pending Request deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

