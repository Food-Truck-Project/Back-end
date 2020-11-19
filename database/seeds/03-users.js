
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'ketal', password: "noworries123", email:"encrypted@gmail.com", role: 1, location_id: 1},
        {id: 2, username: 'hello', password: "hahah123", email: "something@gmail.com", role: 2, location_id: 2},
      ]);
    });
};
