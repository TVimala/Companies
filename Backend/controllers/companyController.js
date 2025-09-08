const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/db');
const { validationResult } = require('express-validator');

// CREATE company
async function createCompany(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = getDb();
    const collection = db.collection('companies');
    const result = await collection.insertOne(req.body);
    const createdCompany = await collection.findOne({ _id: result.insertedId });
res.status(201).json(createdCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

// UPDATE company
async function updateCompany(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = getDb();
    const collection = db.collection('companies');
    const updateDoc = { $set: { ...req.body, updatedAt: new Date() } };
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      updateDoc
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

// GET all companies
async function getCompanies(req, res) {
  try {
    const db = getDb();
    const collection = db.collection('companies');
    const companies = await collection.find().toArray();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

// GET single company
async function getCompanyById(req, res) {
  try {
    const db = getDb();
    const collection = db.collection('companies');
    const company = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

// DELETE company
async function deleteCompany(req, res) {
  try {
    const db = getDb();
    const collection = db.collection('companies');
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ message: 'Company deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}

module.exports = {
  createCompany,
  updateCompany,
  getCompanies,
  getCompanyById,
  deleteCompany
};
