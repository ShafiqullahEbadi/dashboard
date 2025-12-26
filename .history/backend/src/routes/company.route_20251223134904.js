import express from "express";

const router = express.Router();

router.get("/", getCo);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;