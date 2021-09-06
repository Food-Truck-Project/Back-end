#Back-end

## USERS ENDPOINTS 👤:

**/[GET] endpoint for all users in the database /**
```
/api/users
```
----------------------------------------------------------------
**/[GET] endpoint for an operator's trucks in the database /**
```
/api/users/:user_id/trucks
```

**/ REQUIREMENTS; A USER MUST BE LOGGED IN, AS WELL AS IT SHOULD BE AN OPERATOR /**

----------------------------------------------------------------
**/[POST] - Register endpoint for a new user in the database/**
```
/api/users/register
```

**REQUIRED KEY/VALUES FOR POST**
```
{

 *username: STRING
 *password: STRING
 *email: STRING
 *role: STRING
 
}
```
----------------------------------------------------------------
**/[POST] - Login endpoint for a new user in the database/**
```
/api/users/login
```
**REQUIRED KEY/VALUES FOR POST**
```
{

 *username: STRING
 *password: STRING
 
}
 ```
----------------------------------------------------------------
**/[POST] - endpoint for a creating a user's location in the database /**
```
/api/users/:user_id/currentlocation
```


**REQUIRED KEY/VALUES FOR POST**
```
{ 
 *latitude: float number i.e. -0.234
 *longitude: float number
 *physical_address: STRING - OPTIONAL
 }
```
-----------------------------------------------------------------

## TRUCKS ENDPOINTS 🚎🚌:

**/[GET] endpoint for all trucks in the database /**
```
/api/trucks
```
----------------------------------------------------------------
**/[GET] endpoint for getting a single truck based on the truck_id in the database/**
```
/api/trucks/:truck_id
```
----------------------------------------------------------------
**/[GET] endpoint for getting a truck's location based on the truck_id/**
```
/api/trucks/:truck_id/location
```

**REQUIREMENTS; A USER MUST BE LOGGED IN**

----------------------------------------------------------------

**/ [POST] endpoint for creating a truck for a user /**
```
/api/users/:user_id/trucks/
```

**REQUIRED KEY/VALUES FOR POST**
```
{

  truckName: STRING
  truckImg: STRING
  cuisineType_id: NUMBER IN A STRING -- SEE BELOW
  
}
```

**/ REQUIREMENTS; AN OPERATOR MUST FILL OUT THE FOLLOWING PROPERTIES TO POST A TRUCK: /**

```
*truckName
*truckImg
*cuisineType_id   --- This should be a radio button with an value of either one of the options:
*1-Asian
*2-American
*3-European
*4-Australian
```

----------------------------------------------------------------
**/ [POST] endpoint for creating a location for a truck /**
```
/api/trucks/:truck_id/location/
```
**REQUIRED KEY/VALUES FOR POST**
```
{

  location: STRING
  departureTime: STRING
  
}
```
----------------------------------------------------------------
**/[PUT] endpoint updating an user's existing truck /**
```
/api/users/:user_id/trucks/:truck_id
```

**REQUIRED KEY/VALUES FOR PUT**
```
{

  truckName: STRING
  truckImg: STRING
  cuisineType_id: NUMBER IN A STRING -- SEE BELOW
  
}
```

**/ REQUIREMENTS; AN OPERATOR MUST FILL OUT THE FOLLOWING PROPERTIES TO "PUT" A TRUCK: /**

```
*truckName
*truckImg
*cuisineType_id   --- This should be a radio button with an value of either option:
*1-Asian
*2-American
*3-European
*4-Australian
NOTE; MAKE A "GET" REQUEST WITH THE TRUCK ID A USER WANTS TO UPDATE IN ORDER TO AUTOMATICALLY FILL OUT THE INPUTS WITH EXISTING TRUCK VALUES
```

----------------------------------------------------------------
**/[DELETE] endpoint for a user's truck in the database /**
```
/api/users/:user_id/trucks/:truck_id
```
----------------------------------------------------------------
## MENU-ITEMS ENDPOINTS 🚎🚌:

**/[GET] endpoint for getting a single truck's menuitems based on the truck_id in the database /**
```
/api/trucks/:truck_id/menuitems
```
----------------------------------------------------------------
**/[POST] endpoint for creating a truck's menu item in the database /**
```
/api/trucks/:truck_id/menuitems
```

**/ REQUIRED KEY/VALUES FOR POST /**

```
{

  *itemName: STRING
  *itemDescription: STRING
  *itemImg: STRING
  *itemPrice: STRING
  
}

