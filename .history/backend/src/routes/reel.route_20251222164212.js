import express from "express";
import { createReelController, deleteReelController, getReelController, updateReelController } from "../controllers/reel.controller.js";

const router = express.Router();

router.get("/", getReelController);
router.post("/", createReelController);
router.put("/:id", updateReelController);
router.delete("/:id", deleteReelController);

export default router;
