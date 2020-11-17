# Back-end


## USERS ENDPOINTS 👤:

 **/[GET] endpoint for all users in the database /**
```
/api/users
```

**/[POST] - Register endpoint for a new user in the database / **
```
/api/users/register
```
**Note: username, password & email are all REQUIRED FIELDS and need to pass them as a payload while making the request.**

**/[POST] - Login endpoint for a new user in the database /**
```
/api/users/login
```
**Note: username, password & email are all REQUIRED FIELDS and need to pass them as a payload while making the request.**

**/[PUT] Updating endpoint for a single user in the database /**

```
/api/users/:id/update
```
**Note: username, password & email are all REQUIRED FIELDS and need to pass them as a payload while making the request.**

**/[DELETE] endpoint to Delete a single user in the database /**
```
/api/users/:id
```
