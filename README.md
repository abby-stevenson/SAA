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
2. In SAA, cd into the backend folder
```bash
  cd backend
```
3.. In the terminal run:
```bash
  docker-compose up --build
```
4. Switch into the server folder
```bash
  cd server
```
5.  In the terminal run:
```bash
  mvn clean install
  mvn exec:java -Dexec.mainClass="app.SAAServer"
```
6. Open another terminal and open the frontend
```bash
  cd saa-app
```
7. In the terminal run:
```bash
  npm install
  npm start react
```
8. Once the containers are started and properly running, please click on the link witin the front-end, which is hosted at 
```
    http://localhost:3000
```

# Authors
This project consisted of work and collaboration from Ivionna Jordan, Abby Stevenson, Venice Lin, Jack Sweeney, Leah Pascarelli, Olivia Stepper, Grace Preston, Madeline Engle, and Brett Fargo. Here are our other project repositrories and works below:
- [@jordan-iv](https://www.github.com/jordan-iv)
- [@abby-stevenson](https://github.com/abby-stevenson)
- [@fshhhh](https://github.com/fshhhh)
- [@jack5Sweeney](https://github.com/jack5Sweeney)
- [@lpac21](https://github.com/lpac21)
- [@stepper1029](https://github.com/stepper1029)
- [@gpreston22](https://github.com/gpreston22)
- [@madgengle](https://github.com/madgengle)
- [@mykra](https://github.com/Mykra)