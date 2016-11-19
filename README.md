# Making a really awesome to-do list called Git R Done

## cause I guess I think that funny or something

CREATE TABLE people ( id SERIAL PRIMARY KEY, first_name VARCHAR(80), last_name VARCHAR(80) );

INSERT INTO people (first_name, last_name) VALUES ('Jason', 'Sunde'), ('Liz', 'Swabey-Keith'), ('Michael', 'Brannan');

SELECT * FROM people;

CREATE TABLE jobs( id SERIAL PRIMARY KEY, title VARCHAR(80) );

INSERT INTO jobs(title) VALUES ('Marine Psychologist'), ('Ninja'), ('Senator'), ('Senator Ninja'), ('Marine Psychologist Senator Ninja');

SELECT * FROM jobs;

INSERT INTO jobs(title, people_id) VALUES ('Astronaut', 1);

INSERT INTO jobs(title, people_id) VALUES ('Paranormal Investigator', 3);

SELECT * FROM jobs;

SELECT * FROM jobs JOIN people ON people.id=jobs.people_id WHERE people.first_name='Jason';

CREATE TABLE people_jobs( PRIMARY KEY(people_id, jobs_id), people_id INTEGER REFERENCES people, jobs_id INTEGER REFERENCES jobs );

INSERT INTO people_jobs(people_id, jobs_id) VALUES(1,2), (1,5), (1,7), (1,8), (1,3), (2,5), (3,5);

DROP TABLE people_jobs;

SELECT * FROM people_jobs;

SELECT * FROM people JOIN people_jobs AS pj ON people.id = pj.people_id JOIN jobs ON jobs.id = pj.jobs_id;

SELECT * FROM people;

INSERT INTO people (first_name, last_name) VALUES ('Steve', 'Larsen');

DELETE FROM people WHERE first_name='Steve';

CREATE TABLE stats( id SERIAL PRIMARY KEY, recorded TIMESTAMP DEFAULT current_date, inches INTEGER, drought BOOLEAN NOT NULL DEFAULT FALSE, city VARCHAR(80) );

INSERT INTO stats (recorded, inches, drought, city) VALUES ('1997-10-02', 20, true, 'Chicago'), ('1997-10-12', 10, true, 'Chicago'), ('2001-11-02', 1, false, 'Detroit'), ('2010-08-05', 3, true, 'Detroit'), ('2010-07-06', 0, false, 'Detroit'), ('2016-09-20', 3, true, 'Las Vegas');

SELECT * FROM stats;

SELECT MAX(inches), MIN(inches), AVG(inches) FROM stats;

SELECT city, inches FROM stats GROUP BY city;
