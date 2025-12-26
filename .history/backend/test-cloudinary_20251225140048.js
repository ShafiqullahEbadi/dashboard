import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

console.log("Config:", {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key,
  api_secret: cloudinary.config().api_secret ? "***" : "MISSING",
});

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/butterfly.png",
      {
        folder: "test_connection",
      }
    );
    console.log("Upload successful:", result.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

testUpload();
