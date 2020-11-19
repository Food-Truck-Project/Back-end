const { where } = require("../database/dbConfig");
const db = require("../database/dbConfig");


module.exports = {
    getAll,
    getSingleTruck,
    getTruckMenuItems,
    create,
    findTruckByTruckId,
    findUserTrucks,
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
    .orderBy("t.id")

}

// get's a single truck based on the truck_id
 function getSingleTruck(id) {
    return db('trucks as t')
    .join('cuisine_types as ct', 'ct.id', 't.cuisineType_id')
    .select("t.truckName", "t.truckImg", "ct.cuisineType")
    .where({'t.id': id})
}

// gets a single trucks menuItems

function getTruckMenuItems(truck_id){
    return db('trucks as t')
    .join('menu_items as m_i', 't.id', 'm_i.truck_id')
    .select("t.truckName", "m_i.itemName", "m_i.itemDescription", "m_i.itemImg")
    .where({'t.id': truck_id})
}
//creates a truck with the folowing properties: imageoftruck, cuisinetype, customerRatings

function getTruckLocation(truck_id){
    return db('trucks as t')
    .join('menu_items as m_i', 't.id', 'm_i.truck_id')
    .select("t.truckName", "m_i.itemName", "m_i.itemDescription", "m_i.itemImg")
    .where({'t.id': truck_id})
}
async function create(truck) {
    const [id] = await db('trucks').insert(truck)
    return db("trucks as t")
    .join('cuisine_types as ct', 'ct.id', 't.cuisineType_id')
    .select("t.id", "t.truckName", "ct.cuisineType")
    .where({ "t.id": id })
   
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

//update trucks by trucks_id
 function update(id, changes) {
   return db('trucks').where({ id }).update(changes, "id")
}

// remove trucks by truck id
function remove(id) {
    return db('trucks').where({ id }).delete()
 }
