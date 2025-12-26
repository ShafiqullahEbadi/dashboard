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
app.use
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
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
  })
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
