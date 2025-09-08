const { MongoClient } = require('mongodb');

let db=null;
let client=null;

async function connectDB(uri) {
    if (db) return db; 
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    await db.collection('companies').createIndex( { name: 'text', description: 'text', tags: 'text' },
    { name: 'companies_text_index', default_language: 'english' });
    console.log('Connected to MongoDB');
    return db;
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB , client};
