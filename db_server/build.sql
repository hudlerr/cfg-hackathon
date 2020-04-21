BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    fullname char(300) NOT NULL,
    email varchar(300) NOT NULL,
    password varchar(300) NOT NULL,
    phonenumber int NOT NULL,
    postcode varchar(300) NOT NULL
);

INSERT INTO users (fullname, email, password, phonenumber, postcode) VALUES
('test', 'test@hotmail.com', 'test', 999, 'LE5 2AA');

COMMIT;