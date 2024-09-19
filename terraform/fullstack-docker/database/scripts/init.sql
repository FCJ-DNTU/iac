-- Create database and tables during container initialization
CREATE DATABASE IF NOT EXISTS TODOAPP;
USE TODOAPP;

CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS TASKS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    `desc` VARCHAR(50),
    isComplete BOOL
);
