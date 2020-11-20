
exports.up = async function(knex) {
    await knex.schema

    .createTable('roles', tbl => {
     tbl.increments();
     tbl.string("name", 128).notNullable()
   })
    
   

   .createTable('users', tbl => {
    tbl.increments();
    tbl.string("username", 125).notNullable().unique();
    tbl.string("password", 255).notNullable().unique();
    tbl.string("email").notNullable().unique();
    tbl.integer("role").unsigned()
    .references("id")
    .inTable("roles")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
    
  })


  .createTable('customers_locations', tbl => {
    tbl.increments();
    tbl.float('latitude').defaultTo(0.0)
    tbl.float('longitude').defaultTo(0.0)
    tbl.string('physical_address').defaultTo("Not specified")
    tbl.integer("user_id").unique().unsigned()
    .references("id")
    .inTable("users")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
    
})
   .createTable('cuisine_types', tbl => {
     tbl.increments();
     tbl.string("cuisineType")
   })
        
    .createTable('trucks', tbl => {
       tbl.increments()
       tbl.integer("user_id")
       .unsigned()
       .references("id")
       .inTable("users")
       .onDelete("CASCADE")      
       .onUpdate("RESTRICT")
       tbl.string("truckName").notNullable()
       tbl.string("truckImg").notNullable()
       tbl.integer("customerRatingAvg")
       tbl.integer("cuisineType_id")
       .unsigned()
       .references("id")
       .inTable("cuisine_types")
       .onUpdate("RESTRICT")
       .onDelete("CASCADE")
       
     })
     
     .createTable('trucks_locations', tbl => {
      tbl.increments()
      tbl.varchar("location").notNullable()
      tbl.dateTime("departureTime").notNullable()
      tbl.integer("truck_id")
      .unsigned()
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")      
      .onUpdate("RESTRICT") 
    })
     .createTable('customers_ratings', tbl => {
       tbl.increments();
       tbl.integer("rating").unique().defaultTo(0);
     })
     //ready
     .createTable('menu_items', tbl => {
       tbl.increments();
       tbl.string("itemName").notNullable().unique();
       tbl.string("itemDescription").notNullable();
       tbl.string("itemImg").notNullable();
       tbl.integer("itemPrice").defaultTo(0);
       tbl.integer("truck_id")
       .unsigned()
       .references('id')
       .inTable('trucks')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')
     })
     .createTable('menuItem_ratings', tbl => {
       tbl.increments();
       tbl.integer('menuItem_id').unsigned()
       .references('id')
       .inTable('menu_items')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')  
       tbl.integer("customerRating_id")
       .unsigned()
       .references('id')
       .inTable('customers_ratings')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')

     })
     .createTable('trucks_ratings', tbl => {
       tbl.increments();
       tbl.integer("truck_id")
       .unsigned()
       .references('id')
       .inTable('trucks')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')
       tbl.integer("customers_rating_id")
       .unsigned()
       .references('id')
       .inTable('customers_ratings')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')
     })
     .createTable('diner_favoriteTrucks', tbl => {
       tbl.increments();
       tbl.integer("user_id")
       .unsigned()
       .references('id')
       .inTable('users')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')
       tbl.integer("truck_id")
       .unsigned()
       .references('id')
       .inTable('trucks')
       .onUpdate('RESTRICT')
       .onDelete('CASCADE')
     })

 };
 
 exports.down = function(knex) {
     return knex.schema.dropTableIfExists('diner_favoriteTrucks')
     .dropTableIfExists('trucks_ratings')
     .dropTableIfExists('menuItem_ratings')
     .dropTableIfExists('menuItems')
     .dropTableIfExists('customers_ratings')
     .dropTableIfExists('trucks_locations')
     .dropTableIfExists('trucks')
     .dropTableIfExists('cuisine_types')
     .dropTableIfExists('customers_locations')
     .dropTableIfExists('users')
     .dropTableIfExists('roles')
 };
 