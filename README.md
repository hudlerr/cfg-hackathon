## Neighbourly
Lets be helpful neighbours again!

 - - - -
 ## Judges:
 We've been unable to get heroku (or other hosting platforms) working with our website so i'll leave instructions to setup below:
 1. install npm and postgresql (https://github.com/coding-wiki/learn-sql/blob/master/postgresql/setup.md)
 2. `git clone https://github.com/hudlerr/cfg-hackathon.git && cd cfg-hackathon`
 3. `npm install`
 4. `cd db_server`
 5. `psql`
 6. `CREATE DATABASE closehands`
 7. `CREATE USER huda WITH SUPERUSER PASSWORD 'super';`
 8. `ALTER DATABASE closehands OWNER TO huda;`
 9. `\include build.sql`
 10. `\q`
 11. `npm run dev`
 12.  Navigate to http://localhost:8000 and login as user - test@hotmail.com with password - test to see a sample user dashboard, or create your own! 
 *  `psql postgres://huda:super@localhost:5432/closehands` - to connect to the db if you loose connection at any point (from cmd)
 - - - -
 
### Tools:
- Bootstrap for frontend
- NodeJS + Express + PostgreSQL for backend

 - - - -
 
### User Stories
[ x ] As a user, I want to be able to type in my post code and/or partial address, which places me in my correct location

[ x ] As a user, I want to be placed in my correct neighbourhood group, so that I can interact with my neighbours

[ x ] As a user, I want to be able to view a list requests from my neighbour group, so that I can choose to interact

[ x ] As a user, I want to be able to post a request, so that my neighbourhood is able to view it

[ x ] As a user, I want to be able to login/logout and see my profile and neighbourhood group

[ x ] As a user, I want to be able to press a confirm button on a specific request, so as to pick up the request

[ x ] As a user, I want to have a profile, so I can personalise my account

[ x ] As a user, I want to have a list of all my requests and responses, so I can keep track of my account

[ x ] As a user, I want to be able to press 'completed' on a request when a neighbour has completed my task, so I can keep track tasks

 - - - -

### Reqirements
* A user is able to post/ accept task
* User who posted should be able to approve or disapprove 
* User recieves mobile number of taker to get in contact
* Profile of users, lists all closed tasks they've undertaken and/or tasks theyve posted

 - - - -
    
### Edge cases
* User has tasks completed for them but fails to close task
* User spams group with fake requests

 - - - -
 
### Developer Setup
* Fork this repository, and cd into it -

  `git clone https://github.com/hudlerr/cfg-hackathon.git`
  
  `cd cfg-hackathon`

  `npm install`

  `npm run dev`

  Navigate to http://localhost:8000

For contribuing guidelines -> howtocontribute.md
