const db = require("../database/dbConfig");


module.exports = {
    getAll,
    create,
    findById,
    findBy,
    update,
    remove,
}


function getAll() {
    return db('users').select("id", "username", "email")
}

async function create(user) {
 const [id] = await db('users').insert(user, 'id')
    return db('users')
    .where({ id })
    .first()
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
