// Switch to your study abroad database
db = db.getSiblingDB('StudyAbroadDB');

// Optional: Create collections explicitly (MongoDB does this automatically on first insert)
db.createCollection('universities');
db.createCollection('host_courses');
db.createCollection('neu_courses');
