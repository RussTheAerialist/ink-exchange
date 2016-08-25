create table IF NOT EXISTS users (
  id serial primary key,
  username varchar(25) not null UNIQUE,
  password_hash varchar(255) not null
);
