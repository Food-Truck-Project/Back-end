
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {user_id: 1, truckName: "FastTruck", truckImg: "trucksImgUrl", cuisineType: "Asian"},
        {user_id: 1, truckName: "StarTruck", truckImg: "trucksImgUrl", cuisineType: "Asian"},
        {user_id: 2, truckName: "SomethingFishy", truckImg: "trucksImgUrl",  cuisineType: "American"},
        {user_id: 2, truckName: "WowTruck", truckImg: "trucksImgUrl",  cuisineType: "European"},
      ]);
    });
};
