import Reel from "../models/Reel.js";
import cloudinary from "../lib/cloudinary.js";

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
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResponse = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "reels", timeout: 120000 },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({
            message: "Cloudinary upload failed",
            details: error.message,
          });
        }

        try {
          const newReel = await Reel.create({
            title,
            reel: result.secure_url,
          });
          res.status(201).json(newReel);
        } catch (dbError) {
          console.error("Database Error in createReel:", dbError);
          res.status(500).json({ message: "Failed to save reel to database" });
        }
      }
    );

    uploadResponse.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateReelController = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    if (title) reel.title = title;

    if (file) {
      const uploadResponse = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "reels", timeout: 120000 },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({
              message: "Cloudinary upload failed",
              details: error.message,
            });
          }

          try {
            // Optional: delete old video from cloudinary
            if (reel.reel) {
              const publicId = reel.reel.split("/").pop().split(".")[0];
              await cloudinary.uploader.destroy(`reels/${publicId}`, {
                resource_type: "video",
              });
            }

            reel.reel = result.secure_url;
            await reel.save();
            res.status(200).json(reel);
          } catch (dbError) {
            console.error("Database Error in updateReel:", dbError);
            res
              .status(500)
              .json({ message: "Failed to update reel in database" });
          }
        }
      );
      uploadResponse.end(file.buffer);
    } else {
      await reel.save();
      res.status(200).json(reel);
    }
  } catch (error) {
    console.error(error);
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
