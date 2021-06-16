DROP DATABASE IF EXISTS mancity_DB;

CREATE DATABASE mancity_DB;

USE mancity_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE job (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  job_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (job_id) REFERENCES job (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO department (name)
VALUES ("Player"), ("Coach"), ("Medical"), ("Executive");

INSERT INTO job (title, salary, department_id)
VALUES ("Goalkeeper", 800000, 1), ("Defender", 400000, 1), ("Midfielder", 900000, 1), ("Forward", 1100000, 1), ("Head Coach", 1000000, 2),( "Assistant Coach", 300000, 2), ("Head Doctor", 1500000, 3), ("CEO", 20000000, 4);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Zack", "Steffen", 1, NULL), ("Kyle", "Walker", 2, 1), ("Ilkay", "Gundogan", 3, 1), ("Raheem", "Sterling", 4, 1), ("Sergio", "Aguero", 5, 1), ("John", "Stones", 6, 1), ("Pep", "Guardiola", 7, NULL), ("Edu", "Mauri", 8, NULL);

