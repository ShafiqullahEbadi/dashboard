import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() }); // store in memory

const router = express.Router();

router.get("/", getProjects);

router.post("/", upload.single("image"), createProject);

router.put("/:id", upload.single("image"), updateProject);

router.delete("/:id", deleteProject);

export default router;
