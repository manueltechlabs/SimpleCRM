CREATE DATABASE UserManagement;
USE UserManagement;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users (name, email, status)
VALUES("Hans", "hans@mail.com", "active");

CREATE TABLE users_seq (next_val BIGINT DEFAULT 1);
INSERT INTO users_seq VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM users));   