create table if not exists inks (
  id serial primary key,
  name varchar(50) not null,
  image_url text,
  purchase_url text,
  fetch_from_goulet boolean,
  owner_id integer REFERENCES users (id)
);
