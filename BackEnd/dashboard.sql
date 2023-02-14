\echo 'Delete and recreate dashboard db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dashboard;
CREATE DATABASE dashboard;
\connect dashboard

\i dashboard-schema.sql
\i dashboard-seed.sql

\echo 'Delete and recreate dashboard_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dashboard_test;
CREATE DATABASE dashboard_test;
\connect dashboard_test

\i dashboard-schema.sql