import express from "express";

const router = express.Router();

router.get("/", getCompany);
router.post("/", createCompany);
router.put("/", updateCompany);
router.delete("/", deleteCompany);