import { Service_Provider } from "../models/service_provider.js";
import jwt from "jsonwebtoken";

export const isSAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.service_provider = await Service_Provider.findById(decoded._id);
  next();
};