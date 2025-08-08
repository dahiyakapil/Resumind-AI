import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import express from "express";
import { db } from "./config/db.js";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import resumeRouter from "./routes/resume.routes.js";
import session from "express-session";

import morgan from "morgan";
import jobMatchrouter from "./routes/jobMatch.route.js";


const app = express();
app.use(morgan('dev')); 
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))




app.use(session({
  secret: "your-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));





app.use("/health-check", (req, res) => {
    res.send("Dev Connect Backend is running....")
})


// Routes
app.use("/auth", authRouter);
app.use("/resume", resumeRouter)
app.use("/job", jobMatchrouter)


db()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("MONGO db Connection failed !!!", error)
    })
