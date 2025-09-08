require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const {connectDB} = require('./utils/db');

const app=express();
app.use(cors());
app.use(express.json());

const companyRoutes = require('./routes/companyRoutes');
app.use('/api/companies', companyRoutes);

const PORT = process.env.PORT;
connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
