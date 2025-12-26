import express from "express";
import { createCompany, deleteCompany, getCompanies, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.get("/", getCompanies);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;