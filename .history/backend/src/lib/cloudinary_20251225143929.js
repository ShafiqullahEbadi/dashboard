import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // ensure correct env file

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const api_key = process.env.CLOUDINARY_API_KEY?.trim();
const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

// Masked logging for debugging
console.log("Cloudinary Configured:", {
  cloud_name,
  api_key: api_key
    ? `${api_key.substring(0, 3)}...${api_key.substring(api_key.length - 3)}`
    : "MISSING",
  api_secret: api_secret
    ? `${api_secret.substring(0, 3)}...${api_secret.substring(
        api_secret.length - 3
      )}`
    : "MISSING",
});

export default cloudinary;
