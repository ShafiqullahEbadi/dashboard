import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", createProject);

router.put("/:id", upload.single("image"), updateProject);

router.delete("/:id", deleteProject);

export default router;
