import express from "express";
import {
  createReelController,
  deleteReelController,
  getReelController,
  updateReelController,
} from "../controllers/reel.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/", getReelController);
router.post("/", upload.single("reel"), createReelController);
router.put("/:id", upload.single("reel"), updateReelController);
router.delete("/:id", deleteReelController);

export default router;
