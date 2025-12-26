import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Cloudinary SDK automatically uses CLOUDINARY_URL if it's in process.env
// But let's be explicit and see what it has
console.log("CLOUDINARY_URL exists:", !!process.env.CLOUDINARY_URL);

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
