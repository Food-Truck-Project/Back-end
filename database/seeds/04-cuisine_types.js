
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cuisine_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('cuisine_types').insert([
        {id: 1, cuisineType: 'Asian'},
        {id: 2, cuisineType: 'American'},
        {id: 3, cuisineType: 'European'},
        {id: 4, cuisineType: 'Australian'}
      ]);
    });
};
