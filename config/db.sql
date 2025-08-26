-- Active: 1755252365561@@127.0.0.1@3306@power_tools

CREATE DATABASE power_tools

CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role ENUM("client", "owner") NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE district(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE shop(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    ownerId INT NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    district_id INT NOT NULL,
    address VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    FOREIGN KEY(ownerId) REFERENCES user(id),
    Foreign Key (district_id) REFERENCES district(id)
);

CREATE TABLE tool(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    tool_price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE shop_tool(
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    tool_id INT NOT NULL,
    rent_price DECIMAL(8, 2) NOT NULL,
    Foreign Key (shop_id) REFERENCES shop(id),
    Foreign Key (tool_id) REFERENCES tool(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    shop_tool_id INT NOT NULL,
    order_date DATE NOT NULL,
    period INT NOT NULL,
    total_price DECIMAL(8, 2) NOT NULL,
    FOREIGN KEY(client_id) REFERENCES user(id),
    FOREIGN KEY(shop_tool_id) REFERENCES shop_tool(id)
);

CREATE TABLE admin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_creator BOOLEAN DEFAULT false
);

