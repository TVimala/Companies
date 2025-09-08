require('dotenv').config();
const {connectDB, getDb} = require('../utils/db');
const sample=[
    {
    name: "Nimbus Cloud",
    industry: "Cloud Services",
    employees: 120,
    location: "Bengaluru, India",
    foundedYear: 2016,
    revenue: 3_500_000,
    website: "https://nimbus.example",
    tags: ["saas", "cloud"],
    description: "Cloud infra focused on startups."
  },
  {
    name: "GreenFoods",
    industry: "Food & Beverage",
    employees: 60,
    location: "Hyderabad, India",
    foundedYear: 2018,
    revenue: 500_000,
    website: "https://greenfoods.example",
    tags: ["fmcg", "organic"],
    description: "Organic packaged foods."
  },
];
async function run(){
    try{
        await connectDB(process.env.MONGODB_URI);
        const db=getDb();
        const collection=db.collection('companies');
        const result=await collection.insertMany(sample);
        console.log(`Inserted ${result.insertedCount} documents`);
        process.exit(0);
    }
    catch(err){
        console.error('Error inserting sample data',err);
        process.exit(1);
    }
}
run();