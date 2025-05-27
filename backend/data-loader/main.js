const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const csv = require('csv-parser');

const uri = 'mongodb://DB_USER:DB_PASSWORD@localhost:27017'; // replace with your env values
const dbName = 'StudyAbroadDB';

const collections = {
    universities: 'University_Collection.csv',
    host_courses: 'SA_Course_Collection.csv',
    neu_courses: 'NEU_Course_Collection.csv',
};

async function readCSV(filePath) {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

async function loadData() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);

        for (const [collection, csvFile] of Object.entries(collections)) {
            const filePath = path.join(__dirname, csvFile);
            const data = await readCSV(filePath);
            const result = await db.collection(collection).insertMany(data);
            console.log(`Inserted ${result.insertedCount} documents into ${collection}`);
        }

        console.log('✅ All CSV data loaded into MongoDB');
    } catch (err) {
        console.error('❌ Error loading data:', err);
    } finally {
        await client.close();
    }
}

loadData();
