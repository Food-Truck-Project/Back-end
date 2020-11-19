# Back-end



## USERS ENDPOINTS 👤:

 **/[GET] endpoint for all users in the database /**
```
/api/users
```

**/[GET] endpoint for an operator's trucks in the database /**
```
/api/users/:id/trucks
```

**REQUIREMENTS; A USER MUST BE LOGGED IN, AS WELL AS IT SHOULD BE AN OPERATOR **

**/[POST] - Register endpoint for a new user in the database / **
```
/api/users/register
```
---------------------------------------------------------------------------
## TRUCKS ENDPOINTS 🚎🚌:

 **/[GET] endpoint for all trucks in the database /**

```
/api/trucks
```
**/[GET] endpoint for getting a single truck based on the truck_id in the database /**

```
/api/trucks/:truck_id
```

**REQUIREMENTS; A USER MUST BE LOGGED IN **

 **/[POST] endpoint for a truck in the database /**
 
```
/api/users/:user_id/trucks/
```

**REQUIREMENTS; AN OPERATOR MUST FILL OUT THE FOLLOWING PROPERTIES TO POST A TRUCK:  **
```
**truckName
**truckImg
**cuisineType_id   --- This should be a radio button with an value of either option:
**1-Asian
**2-American
**3-European
**4-Australian
```

 **/[PUT] endpoint updating an operator's existing truck /**

```
/api/users/:user_id/trucks/:truck_id
```

**NOTE; DO A GET REQUEST WITH THE TRUCK ID A USER WANTS UPDATE IN ORDER TO AUTOMATICALLY FILL OUT THE INPUTS WITH EXISTING TRUCK VALUES**


 **/[DELETE] endpoint for a truck in the database /**

```
/api/users/:user_id/trucks/:truck_id
```


---------------------------------------------------------------------------
## MENU-ITEMS ENDPOINTS 🚎🚌:

 **/[GET] endpoint for all trucks menuitems in the database /**

```
/api/trucks/menuitems/:id
```
**/[GET] endpoint for getting a single truck based on the truck_id in the database /**

```
/api/trucks/:truck_id/menuitems
```
