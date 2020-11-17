
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks_owned').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks_owned').insert([
        {id: 1, truckName: "FastTruck", user_id: 1},
        {id: 2, truckName: "StarTruck", user_id: 1},
        {id: 3, truckName: "SomethingFishy", user_id: 2},
        {id: 4, truckName: "WowTruck", user_id: 2},

      ]);
    });
};
