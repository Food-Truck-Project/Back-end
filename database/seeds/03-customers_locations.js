
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers_locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers_locations').insert([
        {id: 1, latitude: 41.385063, longitude: 2.173404, user_id: 1},
        {id: 2, latitude: 56.263920, longitude: 9.501785, user_id: 2}
      ]);
    });
};
