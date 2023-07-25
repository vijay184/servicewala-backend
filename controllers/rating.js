import { Rating } from "../models/Rating.js";
import { Service_Provider } from "../models/service_provider.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const setRating = async (req, res) => {
  try {
    const { email , rating } = req.body;
    let serviceProvider = await Rating.findOne({ email });

    if (!serviceProvider) {
      serviceProvider = await Rating.create({email,rating,count:1,rating_sum:rating });
    }
    else{
      const count = serviceProvider.count+1;
      let total_sum = serviceProvider.rating_sum;
      const rating_new = (rating+total_sum)/count;
      total_sum = total_sum + rating
      serviceProvider.rating = rating_new;
      serviceProvider.count = count;
      serviceProvider.rating_sum = total_sum;
    }
    await serviceProvider.save();

    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const fetchRating = async (req,res) => {
    try {
        const {email} = req.body;
    
        const rate = await Rating.findOne({ email });
        console.log(rate.rating);
        res.status(200).json({
          success: true,
          rating : rate.rating
        });
      } catch (error) {
        next(error);
      }
}
