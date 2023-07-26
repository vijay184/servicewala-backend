import { Customer } from "../models/customer.js";
import {Service_Provider} from "../models/service_provider.js"
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import {degToRad,calculateDistance } from "../utils/functions.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Customer.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, mobile_number, address, longitude, latitude } = req.body;

    let user = await Customer.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    // Get the uploaded image from req.file if it exists
    const image = req.file ? {
      data: req.file.buffer, // The binary image data from multer
      contentType: req.file.mimetype, // The MIME type of the image from multer
    } : undefined;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Pass the image as part of the create() method if it exists
    user = await Customer.create({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      address,
      image,
      longitude,
      latitude,
       // Add the image data to the customer entry
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};


export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.customer,
  });
};

export const logout = (req, res) => {
  console.log("kartuuuuuuuuu");
  res
    .status(200)
    .cookie("token", "", {
      maxAge: 0,
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.customer,
    });
};

export const fetchProximityService = async (req, res) => {
  // Assuming the longitude and latitude are provided as query parameters.
console.log("aa gaya", req.query);
  
  try {
    const { latitude, longitude } = req.query;
    console.log("Customer",longitude,latitude)
    const proximityUsers = await Service_Provider.find({}).exec(); // Use .exec() to execute the query and get the results as an array.
    // console.log(proximityUsers);
    console.log("tyagi");
    const maxDistance = 10000; // 5000 meters (5 kilometers) proximity
    const filtered_provider = proximityUsers.filter((user) => {
    const userLat = user.latitude;
    const userLon = user.longitude;
    console.log(userLat,userLon);
    const distance = calculateDistance(latitude, longitude, userLat, userLon);
    console.log(distance)
    return distance <= maxDistance;
    });
    console.log(filtered_provider);
    return res.status(200).json(filtered_provider);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchLocation = async (req,res,next) => {
  console.log("pahuch gaya");
  console.log(req.body);
  try {
      const {email,latitude,longitude} = req.body;
  
      const location = await Customer.findOne({ email });
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
