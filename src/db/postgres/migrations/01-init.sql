CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);



DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transacion_type') THEN
    CREATE TYPE transacion_type as ENUM ('EARNING', 'EXPENSE', 'INVESTIMENT');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS transacions(
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  type transacion_type NOT NULL
);