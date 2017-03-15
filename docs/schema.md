# Schema Information

## users
column name     | data type   | details
----------------|-------------|-----------------------
id              | integer     | not null, primary key
username        | string      | not null, indexed, unique
email           | string      | not null, indexed, unique
password_digest | string      | not null
image           | attachment  | defaults to generic image
session_token   | string      | not null, indexed, unique

## tracks
column name     | data type   | details
----------------|-------------|-----------------------
id              | integer     | not null, primary key
title           | string      | not null, indexed
artist_id       | integer     | not null, foreign key (references users), indexed
image           | attachment  | defaults to generic image
music           | attachment  | not null

## comments
column name     | data type   | details
----------------|-------------|-----------------------
id              | integer     | not null, primary key
track_id        | integer     | not null, foreign key (references tracks), indexed
author_id       | integer     | not null, foreign key (references users)
text            | text        | not null
