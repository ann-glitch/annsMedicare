import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
import errorHandler from "./middleware/error";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
const port = process.env.PORT || 3000;

//route files
import patients from "./routes/patients";
import auth from "./routes/auth";
import consultation from "./routes/consultations";

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//load env vars
dotenv.config();

//mongodb connection
connectDB();

//set mongo sanitize
app.use(mongoSanitize());

// set security policy
app.use(helmet());

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

//cookie-parser
app.use(cookieParser());

const corsConfig = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsConfig));

//cookie-parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("AnnsMedicare API is up and running....")
})

//mount routers
app.use("/api/v1/patients", patients);
app.use("/api/v1/auth", auth);
app.use("/api/v1/consultation", consultation)

// Import and initialize tasks
import './tasks/cleanupTokens';

//error handler middleware
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
  
  // handle unhandled promise rejections
  process.on("unhandledRejection", (err: any, promise) => {
    console.log(`MongoServerError: ${err.message}`);
  
    //close server and exit process
    server.close(() => {
      process.exit(1);
    });
  });
  
  export default app;