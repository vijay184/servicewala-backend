import express from "express";
import { getMyProfile, login, logout, register, fetchLocation } from "../controllers/service_provider.js";
import { isSAuthenticated } from "../middlewares/service_provider.js";

const router = express.Router();

router.post("/service_provider_registration", register);
router.post("/service_provider_login", login);

router.get("/service_provider_logout", logout);

router.get("/service_provider_profile", isSAuthenticated, getMyProfile);

router.post("/fetch_location",isSAuthenticated, fetchLocation);

export default router;
