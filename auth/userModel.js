const db = require("../database/dbConfig");


module.exports = {
    getAll,
    getUserLocation,
    create,
    createUserLocation,
    findById,
    findBy,
    update,
    remove,
}


function getAll() {
    return db('users').select("id", "username", "email")
}

function getUserLocation(user_id) {
    return db('customers_locations').where("user_id",user_id)
}

async function create(user) {
 const [id] = await db('users').insert(user, 'id')
    return db('users')
    .where({ id })
}

async function createUserLocation(userLocation) {
    const [id] = await db('customers_locations').insert(userLocation, 'id')
    return db("customers_locations")
    .where({ id })
   
}


function findById (id) {
    return db('users').where({ id }).first()
}

 function update(id, changes) {
   return db('users').where({ id }).update(changes, "id")
}

 function findBy(username) {
    return db('users').where(username)
}
function remove(id) {
    return db('users').where({ id }).delete()
 }
