
exports.up = async function(knex) {
     await knex.schema

     .createTable('roles', tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
    })
      .createTable('users', tbl => {
      tbl.increments();
      tbl.string("username", 125).notNullable().unique();
      tbl.string("password", 255).notNullable().unique();
      tbl.string("email").notNullable().unique();
      tbl.integer("role")
      .unsigned()
      .references("id")
      .inTable("roles")
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
        tbl.string("truckImg")
        tbl.string("cuisineType").notNullable()
        
      })
      .createTable('customers_ratings', tbl => {
        tbl.increments();
        tbl.float("rating").unique();
      })
      .createTable('menu_items', tbl => {
        tbl.increments();
        tbl.string("itemName").notNullable().unique();
        tbl.string("itemDescription").notNullable();
        tbl.string("itemImg").notNullable();
        tbl.integer("itemPrice").defaultTo(0);
      })
      .createTable('menuItems_customerRatings', tbl => {
        tbl.increments();
        tbl.integer('menuItem_id').unsigned()
        .references('id')
        .inTable('menu_items')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')  
        tbl.integer("customersRatings_id")
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

  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('trucks_ratings')
      .dropTableIfExists('menuItems_customerRatings')
      .dropTableIfExists('menu_items')
      .dropTableIfExists('customers_ratings')
      .dropTableIfExists('trucks')
      .dropTableIfExists('trucks_owned')
      .dropTableIfExists('users')
  };
  