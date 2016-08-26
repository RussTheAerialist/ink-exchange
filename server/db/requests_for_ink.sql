select requests.*,users.username as requestor
from requests,users
where requests.ink_id = $1 and requests.requestor_id = users.id;
