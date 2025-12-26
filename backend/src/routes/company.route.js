import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../controllers/company.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/", getCompanies);
router.post("/", upload.single("logo"), createCompany);
router.put("/:id", upload.single("logo"), updateCompany);
router.delete("/:id", deleteCompany);

export default router;
