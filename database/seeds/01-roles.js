
exports.seed = function(knex) {
const roles = [{
  name: "diner",  // will get an id of 1
}, {
  name: "operator" , 
}]
      return knex('roles').insert(roles)
      .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
