import { Service_Provider } from "../models/service_provider.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Service_Provider.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    res.status(200).json({
      success: true,
      service: user,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res,next) => {
  try {
    const { name, email, password,mobile_number,occupation,address,longitude,latitude } = req.body;

    let user = await Service_Provider.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const image = req.file ? {
      data: req.file.buffer, // The binary image data from multer
      contentType: req.file.mimetype, // The MIME type of the image from multer
    } : undefined;


    const hashedPassword = await bcrypt.hash(password, 10);

    user = await Service_Provider.create({ name, email, password: hashedPassword, mobile_number,occupation,address,image,longitude,latitude });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.service_provider,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: 0,
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.service_provider,
    });
};

export const fetchLocation = async (req,res,next) => {
  try {
      const {email,latitude,longitude} = req.body;
  
      const location = await Service_Provider.findOne({ email });
      console.log(location.name);
      location.latitude = latitude;
      location.longitude = longitude;
      await location.save();
      res.status(200).json({
        success: true,
        message: "Location Updated Successful",
      });
    } catch (error) {
      next(error);
    }
}
