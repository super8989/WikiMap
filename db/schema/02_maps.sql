-- Drop and recreate Maps table

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255),
  latitude NUMERIC(17, 15),
  longitude NUMERIC(17, 15),
  created_at DATE NOT NULL,
  removed_at DATE DEFAULT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
