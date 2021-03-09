PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Shelter (
	id INTEGER PRIMARY KEY ASC,
	name VARCHAR(50),
	location VARCHAR(50),
	description VARCHAR(100),

	UNIQUE(name,location)
);

CREATE TABLE IF NOT EXISTS Animal (
	id INTEGER PRIMARY KEY ASC,
	type VARCHAR(40),
	age INTEGER,
	name VARCHAR(50),
	description VARCHAR(100),
	shelterID INTEGER,

	FOREIGN KEY (shelterID) REFERENCES Shelter(id)
);
