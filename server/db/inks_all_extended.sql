select inks.*,users.id,users.username from inks, users where inks.owner_id = users.id;
