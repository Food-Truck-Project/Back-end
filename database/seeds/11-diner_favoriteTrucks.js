
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('diner_favoriteTrucks').del()
      .then(function () {
        // Inserts seed entries
        return knex('diner_favoriteTrucks').insert([
          {user_id: 1, truck_id: 1},
          {user_id: 1, truck_id: 2}
        ]);
      });
  };
  