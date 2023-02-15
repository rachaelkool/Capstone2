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

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO employees (employee_id, password, first_name, last_name, is_admin)
VALUES (1001,
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Melvin',
        'Jenkins',
        FALSE),
       (2001,
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Goldie',
        'Doo',
        TRUE);


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

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);