select inks.*,users.username as owner_name from inks, users where inks.id = $1;
