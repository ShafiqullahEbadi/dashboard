import express from "express"
import { addExperienceController, deleteExperienceController, getAllExperienceController, updateExperienceController } from "../controllers/experience.controller.js";

const router = express.Router();

router.post("/", addExperienceController);
router.get("/", getAllExperienceController);
router.delete("/:id", deleteExperienceController);
router.put("/:id", updateExperienceController);

export default router
