\echo 'Delete and recreate pokecollector db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pokecollector;
CREATE DATABASE pokecollector;
\connect pokecollector

\i pokecollector-schema.sql
\i pokecollector-seed.sql

-- \echo 'Delete and recreate pokecollector_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE pokecollector_test;
-- CREATE DATABASE pokecollector_test;
-- \connect pokecollector_test
