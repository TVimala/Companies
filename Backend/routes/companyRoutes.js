const express = require('express');
const router=express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/db');
const { body, validationResult } = require('express-validator');
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

router.post('/', validateCompany, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    try {
        const db = getDb();
        const collection = db.collection('companies');
        const result = await collection.insertOne(req.body);
        res.status(201).json({ message: 'Company created', companyId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.put('/:id', validateCompany, async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const db = getDb();
        const collection = db.collection('companies');
        const updateDoc = { $set: { ...req.body, updatedAt: new Date() } };    
        const result = await collection.updateOne({ _id: new(req.params.id) }, updateDoc);
        if(result.matchedCount === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
    }
        catch(err) {
            console.error(err);
            res.status(500).json({ error: 'server error' });
        }
});

