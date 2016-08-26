create table if not exists requests (
  id serial primary key,
  requestor_id integer REFERENCES users (id) not null,
  ink_id integer REFERENCES inks(id) not null,
  requested_date timestamp not null default now(),
  fulfilled_date timestamp
);
