import Reel from "../models/Reel.js";
import cloudinary from "../lib/cloudinary.js";

export const getReelController = async (req, res) => {
  try {
    const reels = await Reel.find().sort({_id: -1});
    res.status(200).json(reels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createReelController = async (req, res) => {
  try {
    const { title } = req.body;
    const videoFile = req.files?.reel?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    if (!title || !videoFile || !thumbFile) {
      return res.status(400).json({
        message: "Title, reel video, and thumbnail are required",
      });
    }

    // Upload video
    const uploadVideo = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "reels" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(videoFile.buffer);
      });

    // Upload thumbnail
    const uploadThumbnail = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "reel-thumbnails" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(thumbFile.buffer);
      });

    const [videoResult, thumbResult] = await Promise.all([
      uploadVideo(),
      uploadThumbnail(),
    ]);

    const newReel = await Reel.create({
      title,
      reel: videoResult.secure_url,
      thumbnail: thumbResult.secure_url,
    });

    res.status(201).json(newReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateReelController = async (req, res) => {
  try {
    const { title } = req.body;
    const videoFile = req.files?.reel?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    if (title) reel.title = title;

    if (videoFile) {
      const videoUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "reels" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(videoFile.buffer);
      });

      reel.reel = videoUpload.secure_url;
    }

    if (thumbFile) {
      const thumbUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "reel-thumbnails" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(thumbFile.buffer);
      });

      reel.thumbnail = thumbUpload.secure_url;
    }

    await reel.save();
    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReelController = async (req, res) => {
  try {
    const deletedReel = await Reel.findByIdAndDelete(req.params.id);
    if (!deletedReel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    if (deletedReel.reel) {
      const publicId = deletedReel.reel.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`reels/${publicId}`, {
        resource_type: "video",
      });
    }

    res.status(200).json(deletedReel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
