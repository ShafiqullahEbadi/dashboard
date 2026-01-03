import mongoose from "mongoose";

const rellSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reel: { type: String, required: true },
  thumbnail: { type: String, required: true }
});

const Reel = mongoose.model("Reel", rellSchema);

export default Reel;
