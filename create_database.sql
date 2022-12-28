-- create database with name = todos
CREATE DATABSE todos;

-- create a table with name todo
CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
)