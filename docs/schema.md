# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
wca_id          | string    | not null, unique
delegate        | boolean   | not null, default 0
profile_img     | string    |
description     | string    |

## tournaments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
organizer   | integer   | not null, foreign key (references users)
delegate    | integer   | not null, foreign key (references users)
name        | string    | not null
events      | array     | not null
location    | string    | not null
venue       | string    | not null

## tournament_registrations
column name | data type | details
------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key (references users)
tournament_id | integer   | not null, foreign key (references tournaments)
