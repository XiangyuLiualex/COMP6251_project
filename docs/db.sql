-- A new private network of health practices has asked your team to 
-- create a web application for capturing and maintaining electronic health 
-- records of their patients, to help patients, doctors, and practitioners 
-- to access relevant information and services offered by the practices. 
-- The application can offer services such as making appointments, 
-- specialist referrals, updating medical history, issuing electronic prescriptions, 
-- and other services under one platform.

-- foreign key needed ?
DROP DATABASE IF EXISTS HEALTHSYSTEM;
CREATE DATABASE HEALTHSYSTEM;
USE HEALTHSYSTEM;

-- todo: divide into two parts info and credential
-- firstname middlename lasttname
-- address in detail, zipcode, city
DROP Table IF EXISTS `patient`;
CREATE TABLE `patient`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    date_of_birth DATE,
    address VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
)


DROP Table IF EXISTS `admin`;
CREATE TABLE `admin`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
)

DROP Table IF EXISTS `appointment`;
CREATE TABLE `appointment`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT,
    doctor_id BIGINT,
    practitioner_id BIGINT,
    type VARCHAR(20),
    description VARCHAR(255),
    appointment_time DATETIME,
    status TINYINT,
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (practitioner_id) REFERENCES practitioner(id)
)

-- todo: diff between doctor and practitioner
DROP Table IF EXISTS `doctor`;
CREATE TABLE `doctor`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
)

DROP Table IF EXISTS `practitioner`;
CREATE TABLE `practitioner`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
)

-- more details needed
DROP Table IF EXISTS `medical_history_records`;
CREATE TABLE `medical_history_records`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT,
    practitioner_id BIGINT,
    description VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (practitioner_id) REFERENCES practitioner(id)
)


-- more details needed
DROP Table IF EXISTS `electronic_prescription`;
CREATE TABLE `electronic_prescription`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT,
    practitioner_id BIGINT,
    description VARCHAR(255),
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (practitioner_id) REFERENCES practitioner(id)
)

-- result maybe in blob, multiple images and text in specific format 
DROP Table IF EXISTS `medical_test`;
CREATE TABLE `medical_test`(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT,
    practitioner_id BIGINT,
    status TINYINT,
    type VARCHAR(20),
    description VARCHAR(255),
    result VARCHAR(1000),
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (practitioner_id) REFERENCES practitioner(id)
)
