import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/projects.route.js";
import experienceRoute from "./routes/experience.route.js";
import reelRoute from "./routes/reel.route.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import companyRoute from "./routes/company.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const allowedOrigins = [
  "https://dashboard-pi-black-27.vercel.app",
  "https://shafiqullah-ebadi.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // origin allowed
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/project", projectRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/reel", reelRoute);
app.use("/api/company", companyRoute);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
