#!/bin/bash

echo "Importing CSV files..."

mongoimport --username root --password 123 --authenticationDatabase admin \
  --db StudyAbroadDB --collection universities \
  --type csv --headerline --file /csvs/University_Collection.csv

mongoimport --username root --password 123 --authenticationDatabase admin \
  --db StudyAbroadDB --collection neucourses \
  --type csv --headerline --file /csvs/NEU_Course_Collection.csv

mongoimport --username root --password 123 --authenticationDatabase admin \
  --db StudyAbroadDB --collection sacourses \
  --type csv --headerline --file /csvs/SA_Course_Collection.csv
echo "CSV import completed."
