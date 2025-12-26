import Reel from "../models/Reel.js";
import cloudinary from "cloudinary";

export const getReelController = async (req, res) => {
  try {
    const reels = await Reel.find();
    res.status(200).json(reels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createReelController = async (req, res) => {
  try {
    const { title, reel } = req.body;

    if (!title || !reel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reelUrl = await cloudinary.v2.uploader.upload(reel, {
      resource_type: "video",
      folder: "reels",
    });

    const newReel = await Reel.create({ title, reel: reelUrl.secure_url });
    res.status(201).json(newReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateReelController = async (req, res) => {
  try {
    const { title, reel } = req.body;

    if (!title || !reel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const reelUrl = await cloudinary.v2.uploader.upload(reel, {
      resource_type: "video",
      folder: "reels",
    });

    const updatedReel = await Reel.findByIdAndUpdate(
      req.params.id,
      { title, reel: reelUrl.secure_url },
      { new: true }
    );
    res.status(200).json(updatedReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteReelController = async (req, res) => {
  try {
    const deletedReel = await Reel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
