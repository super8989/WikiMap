-- Drop and recreate Pins table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  image_url TEXT,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at DATE NOT NULL,
  removed_at DATE DEFAULT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
