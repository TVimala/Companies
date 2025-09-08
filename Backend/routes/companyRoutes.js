const express = require("express");
const { body } = require("express-validator");
const { createCompany, updateCompany, getCompanies, deleteCompany } = require("../controllers/companyController");

const router = express.Router();

const validateCompany = [
  body("name").notEmpty().withMessage("Name is required"),
  body("industry").notEmpty().isString(),
  body("employees").notEmpty().isInt({ min: 0 }),
  body("location").notEmpty().isString(),
  body("revenue").notEmpty().isFloat({ min: 0 }),
];

router.post("/", validateCompany, createCompany);
router.put("/:id", validateCompany, updateCompany);
router.get("/", getCompanies);
router.delete("/:id", deleteCompany);

module.exports = router;
