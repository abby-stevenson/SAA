// Switch to your study abroad database
db = db.getSiblingDB('StudyAbroadDB');

// Optional: Create collections explicitly (MongoDB does this automatically on first insert)
db.createCollection('universities');
db.createCollection('host_courses');
db.createCollection('neu_courses');
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "password"],
            properties: {
                name: { bsonType: "string" },
                email: { bsonType: "string" },
                password: { bsonType: "string" },
                year: { bsonType: "string" },
                major: { bsonType: "string" },
                savedCourses: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["universityId", "hostCourseNumber", "hostCourseName", "neuCourseNumber", "credits"],
                        properties: {
                            universityId: { bsonType: "string" },
                            hostCourseNumber: { bsonType: "string" },
                            hostCourseName: { bsonType: "string" },
                            hostCourseDescription: { bsonType: "string" },
                            neuCourseNumber: { bsonType: "string" },
                            term: { bsonType: "string" },
                            credits: { bsonType: "double" },
                            taken: { bsonType: "int" },
                            universityName: { bsonType: "string" },
                            universityCity: { bsonType: "string" },
                            universityCountry: { bsonType: "string" }
                        }
                    }
                },
                recentlyViewedCourses: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["universityId", "hostCourseNumber", "hostCourseName", "neuCourseNumber", "credits"],
                        properties: {
                            universityId: { bsonType: "string" },
                            hostCourseNumber: { bsonType: "string" },
                            hostCourseName: { bsonType: "string" },
                            hostCourseDescription: { bsonType: "string" },
                            neuCourseNumber: { bsonType: "string" },
                            term: { bsonType: "string" },
                            credits: { bsonType: "double" },
                            taken: { bsonType: "int" },
                            universityName: { bsonType: "string" },
                            universityCity: { bsonType: "string" },
                            universityCountry: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
});
