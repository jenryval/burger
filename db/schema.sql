DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;

use burger_db;

CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(30) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY (id)
);
