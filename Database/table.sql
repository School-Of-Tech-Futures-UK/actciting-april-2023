CREATE TABLE venues (
    venue_id INTEGER GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR(255) NOT NULL, 
    capacity INTEGER NOT NULL, 
    address VARCHAR(255) NOT NULL, 
    geolocation VARCHAR(255) NOT NULL, 
    image VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    start_date INTEGER NOT NULL, 
    end_date INTEGER NOT NULL,
    PRIMARY KEY(venue_id)
);