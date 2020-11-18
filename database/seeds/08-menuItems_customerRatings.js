
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menuItem_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('menuItem_ratings').insert([
        {menuItem_id: 1, customerRating_id: 1},
        {menuItem_id: 1, customerRating_id: 2},
        {menuItem_id: 2, customerRating_id: 2},
        {menuItem_id: 2, customerRating_id: 3}
      ]);
    });
};
