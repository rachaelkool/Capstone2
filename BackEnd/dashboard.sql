\echo 'Delete and recreate dashboard db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dashboard;
CREATE DATABASE dashboard;
\connect dashboard

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);

INSERT INTO notes (content)
VALUES ('This is a test note');

\echo 'Delete and recreate dashboard_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dashboard_test;
CREATE DATABASE dashboard_test;
\connect dashboard_test

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);