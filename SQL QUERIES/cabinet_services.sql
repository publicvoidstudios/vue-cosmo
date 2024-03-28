CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    date_stamp TIMESTAMP DEFAULT current_timestamp,
    name TEXT UNIQUE,
    html_id TEXT UNIQUE,
    description TEXT,
    img_url TEXT
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    date_stamp TIMESTAMP DEFAULT current_timestamp,
    parent_html_id TEXT,
    user_name TEXT,
    body TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    date_stamp TIMESTAMP DEFAULT current_timestamp,
    name TEXT UNIQUE,
    html_id TEXT UNIQUE,
    description TEXT,
    img_url TEXT,
    medical BOOLEAN
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    date_stamp TIMESTAMP DEFAULT current_timestamp,
    title TEXT,
    body TEXT,
    author TEXT
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    date_stamp TIMESTAMP DEFAULT current_timestamp,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    hashed_password TEXT,
    first_name TEXT,
    last_name TEXT,
    admin BOOLEAN DEFAULT false
);

ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);