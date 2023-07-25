import express from "express";
import {fetchRating,setRating} from "../controllers/rating.js";

const router = express.Router();

router.get("/fetchRating", fetchRating);
router.post("/setRating", setRating);


export default router;
