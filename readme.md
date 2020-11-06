This project contains all backend operations (admin front-end lottery lunch & signup form) with endpoints

This project can be hosted as a full-stack application by placing build file from admin front-end lottery lunch ( whose github repo is https://github.com/The-Shortcut/admin-front-end-lottery-lunch ) and changing base url.

Hosted on Heroku:https://lottery-lunch-2020.herokuapp.com/

**env file to be added from the documentation file.**

## start the project

`npm start`

## install dependencies

`npm install`

## Project Requirements

- Users sign-up to service and stored their data. They might want to read their data and modify their
  data. The website admin should be able to delete a user.
- Users have interests. One user may have many interests. They store their interests while singing up.
- An admin will generate a pair of users based on interests. Pairs should be generated including all
  people. Same pairs shouldn't be generated again.

## Access Patterns

- User is created with interest as marketing & design. UserTwo is created with interest in marketing.
- Generate a pairs of users.
  - For a given interest, give me all the users.
    - This will give me a list of users.
  - This can be done for all the interest.
- This works even if user deletes or updates the interest.

## API Design

```
# Users
POST /users
GET /users/emaiId
PUT /users/emailId
DELETE /users/emailID
# Interests
POST /interests
GET /interests
DELETE /interests/interestId
# Generate Pairs
POST /lunch-pairs - this should return a lottery lunch pair ID
GET /lunch-pairs/pairId - get the details of the pairs
```

## Database Design

### Users

| email (p.k)     | first_name | last_name | joined_at |
| --------------- | ---------- | --------- | --------- |
| userOne@test.fi | UserOne    | Test      | date      |
| userTwo@test.fi | UserTwo    | Test      | date      |

### Interests

| email (p.k) |
| ----------- |
| marketing   |
| design      |
| development |

### User-Interests

| email (f.k)     | interests (index) |
| --------------- | ----------------- |
| userOne@test.fi | design            |
| userTwo@test.fi | marketing         |

### History-UserPairs

| email1          | email2          |
| --------------- | --------------- |
| userOne@test.fi | userTwo@test.fi |

## SQL STATEMENTS

```
CREATE TABLE lottery_lunch_users(
email VARCHAR(40) PRIMARY KEY,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20)
);
DESCRIBE lottery_lunch_users;
CREATE TABLE lottery_lunch_interests(
interests VARCHAR(20) PRIMARY KEY
);
DESCRIBE lottery_lunch_interests
CREATE TABLE lottery_lunch_user_interests(
email VARCHAR(40),
interests VARCHAR(20)
FOREIGN KEY(email) REFERENCES lottery_lunch_users(email),
FOREIGN KEY(interests) REFERENCES lottery_lunch_interests(interests)
);
CREATE TABLE lottery_lunch_user_interests(
email VARCHAR(40),
interests VARCHAR(20),
PRIMARY KEY(email, interests),
FOREIGN KEY(email) REFERENCES lottery_lunch_users(email),
FOREIGN KEY(interests) REFERENCES lottery_lunch_interests(interests)
);
describe lottery_lunch_user_interests
CREATE TABLE lottery_lunch_history_user_pairs(
email1 VARCHAR(40),
email2 VARCHAR(40),
FOREIGN KEY(email1) REFERENCES lottery_lunch_users(email),
FOREIGN KEY(email2) REFERENCES lottery_lunch_users(email)
);
DESCRIBE lottery_lunch_history_user_pairs;

INSERT INTO lottery_lunch_interests VALUES ('Marketing Automation');
select * from lottery_lunch_interests;
INSERT INTO lottery_lunch_users VALUES ('lio@m.com','lio','dsf','2020-08-30');
select * from lottery_lunch_users;
INSERT INTO lottery_lunch_user_interests VALUES ('lio@m.com','HR');
select * from lottery_lunch_user_interests;

```
