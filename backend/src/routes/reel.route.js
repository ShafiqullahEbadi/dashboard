// routes/reel.route.js
import express from "express";
import multer from "multer";
import {
  createReelController,
  deleteReelController,
  getReelController,
  updateReelController,
} from "../controllers/reel.controller.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", getReelController);

router.post(
  "/",
  upload.fields([
    { name: "reel", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createReelController
);

router.put(
  "/:id",
  upload.fields([
    { name: "reel", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateReelController
);

router.delete("/:id", deleteReelController);

export default router;