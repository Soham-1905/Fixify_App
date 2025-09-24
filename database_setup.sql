-- Create a new database for the project
CREATE DATABASE fixify_db;

-- Switch to the new database
USE fixify_db;

-- Create a table to store the professionals
CREATE TABLE professionals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    image_url VARCHAR(255)
);

-- Create a table to store bookings
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professional_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (professional_id) REFERENCES professionals(id)
);

-- Insert some sample data for the professionals to display
INSERT INTO professionals (name, service, image_url) VALUES
('Soham', 'Plumber', 'static/images/plumber.jpg'),
('Vedant', 'Cleaner', 'static/images/cleaner.jpg'),
('Rugved', 'Electrician', 'static/images/electrician.jpg');