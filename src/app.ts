import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import countryRoutes from "./routes/countryRoutes";
import { erroHandler } from "./middleware/errorHandler";

const app = express();

//middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

/// rete limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

// TODO: //add route and error handler
/// routes
app.use("/api", countryRoutes);

//error handler
app.use(erroHandler);
console.log(`wqrin,..........`);

export default app;
