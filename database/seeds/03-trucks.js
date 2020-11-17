
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {truck_owned_id: 1, truckImg: "trucksImgUrl", cuisineType: "Asian"},
        {truck_owned_id: 2, truckImg: "trucksImgUrl", cuisineType: "Asian"},
        {truck_owned_id: 3, truckImg: "trucksImgUrl",  cuisineType: "American"},
        {truck_owned_id: 4, truckImg: "trucksImgUrl",  cuisineType: "European"},

      ]);
    });
};
