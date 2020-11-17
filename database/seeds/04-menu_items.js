
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('menu_items').insert([
        {id: 1, itemName:"Double Jack" , itemDescription: "Double cheese, double meat, double taste" , itemImg: "NoUrlyET" , itemPrice: 60},
        {id: 2, itemName:"Whatnot Jack" , itemDescription:"Double cheese, double meat, double taste" , itemImg: "NoUrlyET", itemPrice: 40},
        {id: 3, itemName:"Great Jack", itemDescription: "Double cheese, double meat, double taste" , itemImg: "NoUrlyET" , itemPrice: 50}
      ]);
    });
};
