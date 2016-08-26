create table if not exists requests (
  id serial primary key,
  requestor_id integer REFERENCES users (id),
  ink_id integer REFERENCES inks(id)
);
