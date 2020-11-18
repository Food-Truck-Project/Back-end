
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
     tbl.integer("role")
     .references("id")
     .inTable("roles")
     .onDelete("CASCADE")
     .onUpdate("RESTRICT")
     
   })
   .createTable('customers_locations', tbl => {
       tbl.increments();
       tbl.float('latitude').defaultTo(0.0)
       tbl.float('longitude').defaultTo(0.0)
       tbl.string('physical_address').defaultTo("Not specified")
       tbl.integer("user_id")
       .unsigned()
       .references("id")
       .inTable("users")
       .onDelete("CASCADE")
       .onUpdate("RESTRICT")
   })
   .createTable('cuisine_types', tbl => {
     tbl.increments();
     tbl.string("cuisineType").notNullable()
     tbl.integer("truck_id")
      .unsigned()
       .references("id")
       .inTable("trucks")
       .onDelete("CASCADE")
       .onUpdate("RESTRICT")
   })
        
    .createTable('trucks', tbl => {
       tbl.increments()
       tbl.integer("user_id")
       .unsigned()
       .references("id")
       .inTable("users")
       .onDelete("RESTRICT")      
       .onUpdate("RESTRICT")
       tbl.string("truckName").notNullable()
       tbl.string("truckImg").notNullable()
       tbl.integer("cuisineType_id").notNullable()
       .unsigned()
       .references("id")
       .inTable("cuisine_types")
       .onDelete("CASCADE")
       .onUpdate("RESTRICT")
       tbl.integer("customerRatingAvg")
       
     })
     .createTable('trucks_locations', tbl => {
       tbl.increments()
       tbl.string("locations").notNullable()
       tbl.dateTime("departureTime").notNullable()
       tbl.integer("truck_id")
       .unsigned()
       .references("id")
       .inTable("trucks")
       .onDelete("RESTRICT")      
       .onUpdate("RESTRICT") 
     })
    
     .createTable('customers_ratings', tbl => {
       tbl.increments();
       tbl.integer("rating").unique();
     })
     .createTable('menu_items', tbl => {
       tbl.increments();
       tbl.string("itemName").notNullable().unique();
       tbl.string("itemDescription").notNullable();
       tbl.string("itemImg").notNullable();
       tbl.integer("itemPrice").defaultTo(0);
     })
     .createTable('menuItem_ratings', tbl => {
       tbl.increments();
       tbl.integer('menuItem_id').unsigned()
       .references('id')
       .inTable('menu_items')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')  
       tbl.integer("customerRating_id")
       .unsigned()
       .references('id')
       .inTable('customers_ratings')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')

     })
     .createTable('trucks_ratings', tbl => {
       tbl.increments();
       tbl.integer("truck_id")
       .unsigned()
       .references('id')
       .inTable('trucks')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')
       tbl.integer("customers_rating_id")
       .unsigned()
       .references('id')
       .inTable('customers_ratings')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')
     })
     .createTable('diner_favoriteTrucks', tbl => {
       tbl.increments();
       tbl.integer("user_id")
       .unsigned()
       .references('id')
       .inTable('users')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')
       tbl.integer("truck_id")
       .unsigned()
       .references('id')
       .inTable('trucks')
       .onUpdate('RESTRICT')
       .onDelete('RESTRICT')
     })

 };
 
 exports.down = function(knex) {
     return knex.schema.dropTableIfExists('diner_favoriteTrucks')
     .dropTableIfExists('trucks_ratings')
     .dropTableIfExists('menuItems_customerRatings')
     .dropTableIfExists('menu_items')
     .dropTableIfExists('customers_ratings')
     .dropTableIfExists('trucks_locations')
     .dropTableIfExists('trucks')
     .dropTableIfExists('cuisine_types')
     .dropTableIfExists('customers_locations')
     .dropTableIfExists('users')
     .dropTableIfExists('roles')
 };
 