
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menuItems_customerRatings').del()
    .then(function () {
      // Inserts seed entries
      return knex('menuItems_customerRatings').insert([
        {menuItem_id: 1, customersRatings_id: 1},
        {menuItem_id: 1, customersRatings_id: 2},
        {menuItem_id: 2, customersRatings_id: 2},
        {menuItem_id: 2, customersRatings_id: 3}
      ]);
    });
};
