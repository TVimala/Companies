const express = require('express');
const { body } = require('express-validator');
const {
  createCompany,
  updateCompany,
  getCompanies,
  getCompanyById,
  deleteCompany
} = require('../controllers/companyController');

const router = express.Router();

// Validation middleware
const validateCompany = [
  body('name').notEmpty().withMessage('Name is required'),
  body('industry').optional().isString(),
  body('employees').optional().isInt({ min: 0 }),
  body('location').optional().isString(),
  body('foundedYear').optional().isInt({ min: 1800, max: new Date().getFullYear() }),
  body('revenue').optional().isFloat({ min: 0 }),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('tags').optional().isArray(),
  body('description').optional().isString()
];

// Routes
router.post('/', validateCompany, createCompany);
router.put('/:id', validateCompany, updateCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);

module.exports = router;
