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
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
name         | string    | not null
organizer_id | integer   | not null, foreign key (references users)
delegate_id  | integer   | not null, foreign key (references users)
location     | string    | not null
venue        | string    | not null
start_date   | date      | not null
end_date     | date      | not null

## events
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
tournament_id | integer   | not null, foreign key (references tournaments)
event_type    | integer   | not null, enum



## tournament_registrations
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key (references users)
tournament_id | integer   | not null, foreign key (references tournaments)
