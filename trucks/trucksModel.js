const { where } = require("../database/dbConfig");
const db = require("../database/dbConfig");


module.exports = {
    getAll,
    getSingleTruck,
    getTruckMenuItems,
    getTruckLocation,
    create,
    createLocation,
    createMenuItem,
    findTruckByTruckId,
    findUserTrucks,
    findMenuItem,
    update,
    remove,
}

// gives a list of all trucks
async function getAll() {
  const ratingAvg = await db("trucks_ratings as t_r")
    .join("customers_ratings as c_r", "c_r.id", "t_r.customers_rating_id")
    .select(db.raw('ROUND(AVG(c_r.rating),3) AS customersRatingAvg'))
    return db('trucks as t')
    .join('cuisine_types as ct', 'ct.id', 't.cuisineType_id')
    .select("t.id as truck_id", "t.truckName", "t.truckImg", "ct.cuisineType")
    .select(ratingAvg )

}

// get's a single truck based on the truck_id
 function getSingleTruck(id) {
    return db('trucks as t')
    .join('cuisine_types as ct', 'ct.id', 't.cuisineType_id')
    .select("t.truckName", "t.truckImg", "ct.cuisineType")
    .where({'t.id': id})
}

// gets a single trucks menuItems

async function getTruckMenuItems(truck_id){
   const [itemRating] =  await db("customers_ratings as c_r")
    .join('menuItem_ratings as m_r', 'm_r.customerRating_id', 'c_r.id')
    .join('menu_items as m_i', 'm_r.menuItem_id', 'm_i.id')
    .select("c_r.rating")
    .where("m_i.truck_id", truck_id)
    return db('menu_items as m_i')
    .select("m_i.id as item_id","m_i.truck_id", "m_i.itemName", "m_i.itemDescription", "m_i.itemImg", "m_i.itemPrice", itemRating)
    .where("m_i.truck_id", truck_id )
   
}
// Get a particular truck's location

function getTruckLocation(truck_id){
    return db('trucks as t')
    .join('trucks_locations as t_l', 't_l.truck_id', 't.id')
    .select("truck_id", "t_l.location", "t_l.departureTime")
    .where("t.id", truck_id)
}

async function create(truck) {
    const [id] = await db('trucks').insert(truck)
    return db("trucks as t")
    .join('cuisine_types as ct', 'ct.id', 't.cuisineType_id')
    .select("t.id", "t.truckName", "ct.cuisineType")
    .where({ "t.id": id })
   
}

//create a truck's location   -- NEED A TRUCK_ID BEFORE CREATING A TRUCK LOCATION
async function createLocation(truckLocation) {
    const [id] = await db('trucks_locations').insert(truckLocation)
    return db("trucks as t")
    .join('trucks_locations as t_l', 't_l.truck_id', 't.id')
    .select("t.id", "t.truckName", "t_l.location", "t_l.departureTime")
    .where({ "t_l.id": id })
   
}

async function createMenuItem(menuItem) {
    const [id] = await db('menu_items').insert(menuItem)
    return db("menu_items as m_i")
    .join('trucks as t', 'm_i.truck_id', 't.id')
    .select("m_i.id", "t.truckName", "m_i.itemName", "m_i.itemDescription","m_i.itemPrice", "m_i.itemImg")
    .where("m_i.id", id )
   
}

 function findTruckByTruckId(id) {
    return db('trucks').where({ id }).first()
}

// find trucks by user_id
function findUserTrucks(userId) {
   return db('trucks as t')
    .join('users as u', 't.user_id', 'u.id')
    .join('cuisine_types as c_t', 'c_t.id', 't.cuisineType_id')
    .select('t.id', 't.truckName','t.truckImg', 'c_t.cuisineType', 'u.username')
    .where('t.user_id', userId)
}

//Find a truck's menu item
function findMenuItem(itemName) {
    return db('menu_items').where({ itemName}).first()
}
//update trucks by trucks_id
 function update(id, changes) {
   return db('trucks').where({ id }).update(changes, "id")
}

// remove trucks by truck id
function remove(id) {
    return db('trucks').where({ id }).delete()
 }
