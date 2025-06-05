# SAA
A web app that allows NU students to easily search for courses when studying abroad.

# System Architecture
The project includes the following components:

## Frontend
Tech Stack: React / Next.js
Responsibility: User-facing UI and experience
Talks to: API Gateway
Location: /saa-app

## API Gateway
Tech Stack: Java
Responsibility: Routes API requests to services, central point for auth/logging
Talks to: frontend and backend
Location: /backend/server

## Data Loader
Tech Stack: MongoDB, Docker
Responsibility: instantiates the mongo database on start
Talks to: API Gateway
Location: /backend/data-loader, /backend/database-files -> csvs to import

# Deployment
1. Clone the repo: git clone https://github.com/abby-stevenson/SAA.git
2. cd SAA/backend
3. docker-compose up --build
4. cd server
5. mvn clean install
6. mvn exec:java -Dexec.mainClass-app.SAAServer"
7. cd ../../saa-app
8. npm install
9. npm start react
10. click on link

# Authors
Venice, Abby, Leah, Grace, Jack, Ivy, Maddie, Olivia, and Brett

