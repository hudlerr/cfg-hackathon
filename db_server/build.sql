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
    phonenumber int(100) NOT NULL,
    postcode char(300) NOT NULL
);

INSERT INTO users (fullname, email, password, phonenumber, postcode) VALUES
('Huda', 'test@hotmail.com', 'test', 999, 'LE52AA');

--table to store tasks

CREATE TABLE tasks
(
    taskid SERIAL PRIMARY KEY,
    ownerId int NOT NULL,
    neighbourhoodId varchar(200) NOT NULL, --use posters postcode to match tasks to neighbourhood
    titleContent varchar(200) NOT NULL,
    descriptionContent varchar(200) NOT NULL,
    repliedtoUserId int, --nullable, insert when user picks up request
    repliedtoUserNumber varchar(100),
    repliedtoUsername varchar(100),
    created_date date NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO tasks (ownerId, neighbourhoodId, titleContent, descriptionContent)  VALUES
( 01, 'LE52AA', 'Walk my cat', 'Just around the block');

COMMIT;
