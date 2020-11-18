const db = require("../database/dbConfig");


module.exports = {
    getAll,
    create,
    findById,
    findUserTrucks,
    update,
    remove,
}

// gives a list of all trucks
function getAll() {
    return db('trucks as t')
    .select("t.id as truck_id", "t.truckName", "t.truckImg", "t.cuisineType")
    .orderBy("id")
}

//creates a truck with the folowing properties: imageoftruck, cuisinetype, customerRatings

async function create(truck) {
    const [id] = await db('trucks').insert(truck)
    return db("trucks as t")
    .where({ id })
    .select("t.id", "t.truckName", "t.cuisineType")
    .first()
}

function findById(id) {
    return db('trucks').where({ id }).first()
}

function findUserTrucks(userId) {
   return db('trucks as t')
    .join('users as u', 't.user_id', 'u.id')
    .select('t.id', 't.truckName','t.truckImg', 't.cuisineType', 'u.username')
    .where('t.user_id', userId)
}

 function update(id, changes) {
   return db('users').where({ id }).update(changes, "id")
}

function remove(id) {
    return db('users').where({ id }).delete()
 }
