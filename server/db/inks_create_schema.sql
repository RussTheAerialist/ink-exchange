create table if not exists inks (
  id serial primary key,
  name varchar(50) not null,
  image_url text,
  owner_id integer REFERENCES users (id)
);
