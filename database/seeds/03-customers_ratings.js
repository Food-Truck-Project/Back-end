
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers_ratings').insert([
        {id: 1, rating: 4.0},
        {id: 2, rating: 4.2},
        {id: 3, rating: 5.0},
        {id: 4, rating: 6.0}
      ]);
    });
};
