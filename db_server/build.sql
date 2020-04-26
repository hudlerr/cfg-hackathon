BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

--table to store users
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    fullname char(300) NOT NULL,
    email varchar(300) NOT NULL,
    password varchar(300) NOT NULL,
    phonenumber varchar(100) NOT NULL,
    postcode varchar(300) NOT NULL
);

INSERT INTO users (fullname, email, password, phonenumber, postcode) VALUES
('test', 'test@hotmail.com', 'test', 999, 'LE5 2AA');

--table to store tasks

CREATE TABLE tasks
(
    taskid SERIAL PRIMARY KEY,
    ownerId int NOT NULL,
    neighbourhoodId varchar(200) NOT NULL, --use posters postcode to match tasks to neighbourhood
    titleContent varchar(200) NOT NULL,
    descriptionContent varchar(200) NOT NULL,
    repliedtoUserId int, --nullable, insert when user picks up request
    created_date date NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO tasks (ownerId, neighbourhoodId, titleContent, descriptionContent)  VALUES
( 01, 'LE5 2AA', 'Walk my cat', 'Just around the block');

COMMIT;