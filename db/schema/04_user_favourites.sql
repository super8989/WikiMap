-- Drop and recreate User_favourites table

DROP TABLE IF EXISTS user_favourites CASCADE;
CREATE TABLE user_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at DATE NOT NULL,
  removed_at DATE DEFAULT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
