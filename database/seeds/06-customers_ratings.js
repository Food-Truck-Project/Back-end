
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers_ratings').insert([
        {id: 1, rating: 4},
        {id: 2, rating: 5},
        {id: 3, rating: 2},
        {id: 4, rating: 3},
        {id: 5, rating: 1}
      ]);
    });
};
