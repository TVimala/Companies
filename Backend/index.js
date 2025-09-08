require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./utils/db");
const companyRoutes = require("./routes/companyRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/companies", companyRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
