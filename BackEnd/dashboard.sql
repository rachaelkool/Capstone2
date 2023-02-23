\echo 'Delete and recreate dashboard db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dashboard;
CREATE DATABASE dashboard;
\connect dashboard


DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE notes;
DROP TABLE incidents;

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  date TEXT,
  content TEXT NOT NULL,
  emp_id INTEGER NOT NULL REFERENCES employees ON DELETE CASCADE
);

CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  date TEXT,
  severity INTEGER NOT NULL,
  reporting_manager TEXT,
  witness TEXT,
  description TEXT NOT NULL,
  entered_by INTEGER NOT NULL REFERENCES employees ON DELETE CASCADE
);

INSERT INTO employees (employee_id, password, first_name, last_name, is_admin)
VALUES (1001,
        '$2b$12$7Uu3nf.wi0wpaUz.AQimQOyQfX6w5xUWNRQ1oLP7XquOdDXvVV1N6',
        'Melvin',
        'Jenkins',
        FALSE),
       (2001,
        '$2b$12$7Uu3nf.wi0wpaUz.AQimQOyQfX6w5xUWNRQ1oLP7XquOdDXvVV1N6',
        'Goldie',
        'Doo',
        TRUE);
      
INSERT INTO notes (date, content, emp_id)
VALUES ('2023-02-22',
        'This is a test note',
        1001);

INSERT INTO incidents (date, severity, reporting_manager, witness, description, entered_by)
VALUES ('2023-02-22',
        3,
        'Rachael',
        null,
        'This is a test incident',
        1001);


-- \echo 'Delete and recreate dashboard_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE dashboard_test;
-- CREATE DATABASE dashboard_test;
-- \connect dashboard_test

-- DROP TABLE IF EXISTS employees CASCADE;
-- DROP TABLE notes;
-- DROP TABLE incidents;

-- CREATE TABLE employees (
--   employee_id INTEGER PRIMARY KEY,
--   password TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   is_admin BOOLEAN NOT NULL DEFAULT FALSE
-- );

-- CREATE TABLE notes (
--   id SERIAL PRIMARY KEY,
--   date TEXT,
--   content TEXT NOT NULL,
--   emp_id INTEGER NOT NULL REFERENCES employees ON DELETE CASCADE
-- );

-- CREATE TABLE incidents (
--   id SERIAL PRIMARY KEY,
--   date TEXT,
--   severity INTEGER NOT NULL,
--   reporting_manager TEXT,
--   witness TEXT,
--   description TEXT NOT NULL,
--   entered_by INTEGER NOT NULL REFERENCES employees ON DELETE CASCADE
-- );