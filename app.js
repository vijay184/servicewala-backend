import express from "express";
import customerRouter from "./routes/customer.js";
import service_providerRouter from "./routes/service_provider.js";
import ratingRouter from "./routes/rating.js";
import pending from "./routes/pending.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/customer", customerRouter);
app.use("/service_provider", service_providerRouter);
app.use("/rating", ratingRouter);
app.use("/pending", pending)


app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);
