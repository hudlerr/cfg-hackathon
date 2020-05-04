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
('Huda', 'test@hotmail.com', 'test', 07963527356, 'LE52AA'),
('Jane Davis', 'j@hotmail.com', 'test', 07963426738, 'LE52AA'),
('Adam Food', 'a@hotmail.com', 'test', 07963425364, 'LE52AA');

--table to store tasks

CREATE TABLE tasks
(
    taskid SERIAL PRIMARY KEY,
    ownerId int NOT NULL,
    ownerNumber varchar(100) NOT NULL,
    ownerName varchar(100) NOT NULL,
    neighbourhoodId varchar(200) NOT NULL, --use posters postcode to match tasks to neighbourhood
    titleContent varchar(200) NOT NULL,
    descriptionContent varchar(200) NOT NULL,
    repliedtoUserId int, --nullable, insert when user picks up request
    repliedtoUserNumber varchar(100),
    repliedtoUsername varchar(100),
    created_date date NOT NULL DEFAULT CURRENT_DATE,
    status varchar(100)
);

INSERT INTO tasks (ownerId, ownerNumber, ownerName, neighbourhoodId, titleContent, descriptionContent, repliedtoUserId, repliedtoUserNumber, repliedtoUsername, created_date, status)  VALUES
( 02, '07963426738', 'Jane Davis', 'LE52AA', 'Pick up medicine', 'From local pharmacy', 03, '07963425364', 'Adam Food', '2020-04-29', 'In Progress'),
( 03, '07963425364', 'Adam Food', 'LE52AA', 'Collect shopping', 'Already ordered and paid for :)', 01, '07963527356', 'Huda', '2020-04-26', 'In Progress'),
( 01, '07963527356', 'Huda', 'LE52AA', 'Pick up shopping', 'Unable to leave home - paid for', 02, '07963426738', 'Jane Davis', '2020-04-21', 'In Progress'),
( 01, '07963527356', 'Huda', 'LE52AA', 'Walk dog', 'Just around the corner', 03, '07963425364', 'Adam Food', '2020-04-29', 'Completed');

COMMIT;