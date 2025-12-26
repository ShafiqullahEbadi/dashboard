import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

async function testUploadStream() {
  const stream = cloudinary.uploader.upload_stream(
    { folder: "test_stream" },
    (error, result) => {
      if (error) {
        console.error("Upload failed:", error);
      } else {
        console.log("Upload successful:", result.secure_url);
      }
    }
  );

  const buffer = Buffer.from("test image content");
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  readable.pipe(stream);
}

testUploadStream();
