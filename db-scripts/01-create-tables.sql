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

CREATE TABLE gig_requests (
    gig_id INTEGER GENERATED ALWAYS AS IDENTITY,
    artist VARCHAR(255)NOT NULL,
    venue_id INTEGER NOT NULL,
    artist_genre VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    approval_status BOOLEAN,
    PRIMARY KEY(gig_id),
    -- CONSTRAINT fk_artist FOREIGN KEY(artist_id) REFERENCES artists(artist_id),
    CONSTRAINT fk_venue FOREIGN KEY(venue_id) REFERENCES venues(venue_id)
);