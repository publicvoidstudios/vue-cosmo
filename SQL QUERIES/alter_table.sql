ALTER TABLE content
ADD COLUMN date_stamp TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE sections
ADD COLUMN date_stamp TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE subsections
ADD COLUMN date_stamp TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE users
ADD COLUMN admin BOOLEAN DEFAULT false;

ALTER TABLE reviews
ADD COLUMN approved BOOLEAN DEFAULT false;

INSERT INTO users (email, username, hashed_password, first_name, last_name, admin)
VALUES ('996vladlen@gmail.com', 'us_helen', '$2a$10$WsoEuCaB4PAGa5qMAhF9LOZzFnuQR.eaGajdPmg1nyKsvWrUVIuTK', 'Елена', 'Усова', true);