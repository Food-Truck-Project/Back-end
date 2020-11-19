
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks_locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks_locations').insert([
        {id: 1, location: 'Imperial Beach, San Diego CA 19950', departureTime: "2018-11-29T00:00:00.000Z", truck_id: 1},
        {id: 2, location: 'Imperial Beach, San Diego CA 19950', departureTime:"2017-06-23T06:44:44.000Z", truck_id: 2},
        {id: 3, location: '40.741895, -73.989308', departureTime:"2017-06-23T06:44:44.000Z", truck_id: 3}
      ]);
    });
};
