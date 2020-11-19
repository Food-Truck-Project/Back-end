
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks_ratings').insert([
        {truck_id: 1, customers_rating_id: 1},
        {truck_id: 1, customers_rating_id: 2},
        {truck_id: 2, customers_rating_id: 3},
        {truck_id: 3, customers_rating_id: 2},
        {truck_id: 4, customers_rating_id: 4},
      ]);
    });
};
