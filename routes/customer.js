import express from "express";
import { getMyProfile, login, logout, register,fetchProximityService, fetchLocation } from "../controllers/customer.js";
import { isAuthenticated } from "../middlewares/customer.js";

const router = express.Router();

router.post("/customer_register", register);
router.post("/customer_login", login);

router.get("/customer_logout", logout);

router.get("/get_proximity_service", fetchProximityService);

router.get("/customer_profile", isAuthenticated, getMyProfile);

router.post("/fetch_location",isAuthenticated, fetchLocation);

export default router;
