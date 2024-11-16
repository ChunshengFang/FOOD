"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foods = exports.nutritions = exports.reviewsRelations = exports.usersRelations = exports.recipesRelations = exports.reviews = exports.follows = exports.recipes = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey().unique(),
    username: (0, pg_core_1.varchar)('username', { length: 100 }).notNull().unique(),
    email: (0, pg_core_1.varchar)('email', { length: 256 }).notNull().unique(),
    password: (0, pg_core_1.varchar)('password', { length: 256 }).notNull(),
    age: (0, pg_core_1.integer)('age'),
    bio: (0, pg_core_1.text)('bio'),
    interests: (0, pg_core_1.text)('interests').default(''),
    avatarUrl: (0, pg_core_1.text)('avatar_url').default(''),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.recipes = (0, pg_core_1.pgTable)('recipes', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey().unique(),
    authorId: (0, pg_core_1.uuid)('author_id')
        .notNull()
        .references(() => exports.users.id),
    title: (0, pg_core_1.text)('title').notNull().unique(),
    imageUrl: (0, pg_core_1.text)('image_url'),
    description: (0, pg_core_1.text)('description').notNull(),
    ingredients: (0, pg_core_1.json)('ingredients').default([]).notNull(), // with type as [{ foodId: foodId, amount: 100 }]
    ingredientsText: (0, pg_core_1.text)('ingredients_text').default(''),
    dietaryRestrictions: (0, pg_core_1.text)('dietary_restrictions').default('').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.follows = (0, pg_core_1.pgTable)('follows', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey().unique(),
    userId: (0, pg_core_1.uuid)('user_id')
        .notNull()
        .references(() => exports.users.id),
    followingId: (0, pg_core_1.uuid)('following_id')
        .notNull()
        .references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.reviews = (0, pg_core_1.pgTable)('reviews', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey().unique(),
    message: (0, pg_core_1.text)('message').notNull().unique(),
    userId: (0, pg_core_1.uuid)('user_id')
        .notNull()
        .references(() => exports.users.id),
    recipeId: (0, pg_core_1.uuid)('recipe_id')
        .notNull()
        .references(() => exports.recipes.id),
    rating: (0, pg_core_1.integer)('rating').notNull(), // 1-5
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.recipesRelations = (0, drizzle_orm_1.relations)(exports.recipes, ({ one, many }) => ({
    author: one(exports.users, {
        fields: [exports.recipes.authorId],
        references: [exports.users.id],
    }),
    reviews: many(exports.reviews),
}));
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    recipes: many(exports.recipes),
    reviews: many(exports.reviews),
}));
exports.reviewsRelations = (0, drizzle_orm_1.relations)(exports.reviews, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.reviews.userId],
        references: [exports.users.id],
    }),
    recipe: one(exports.recipes, {
        fields: [exports.reviews.recipeId],
        references: [exports.recipes.id],
    }),
}));
// export const followsRelations = relations(follows, ({ one }) => ({
//   user: one(users, {
//     fields: [follows.userId],
//     references: [users.id],
//   }),
//   following: one(users, {
//     fields: [follows.followingId],
//     references: [users.id],
//   }),
// }))
exports.nutritions = (0, pg_core_1.pgTable)('nutritions', {
    nutrientId: (0, pg_core_1.integer)('nutrient_id').primaryKey().unique(),
    nutrientName: (0, pg_core_1.varchar)('nutrient_name', { length: 256 }),
    nutrientNumber: (0, pg_core_1.integer)('nutrient_number'),
    unitName: (0, pg_core_1.varchar)('unit_name', { length: 10 }),
    derivationCode: (0, pg_core_1.varchar)('derivation_code', { length: 10 }),
    derivationDescription: (0, pg_core_1.varchar)('derivation_description', { length: 256 }),
    derivationId: (0, pg_core_1.integer)('derivation_id'),
    value: (0, pg_core_1.doublePrecision)('value').notNull(),
    foodNutrientSourceId: (0, pg_core_1.integer)('food_nutrient_source_id'),
    foodNutrientSourceCode: (0, pg_core_1.varchar)('food_nutrient_source_code', { length: 10 }),
    foodNutrientSourceDescription: (0, pg_core_1.varchar)('food_nutrient_source_description', {
        length: 256,
    }),
    rank: (0, pg_core_1.integer)('rank'),
    indentLevel: (0, pg_core_1.integer)('indent_level'),
    foodNutrientId: (0, pg_core_1.integer)('food_nutrient_id').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.foods = (0, pg_core_1.pgTable)('foods', {
    fdcId: (0, pg_core_1.integer)('fdc_id').primaryKey().unique(),
    description: (0, pg_core_1.text)('description').default(''),
    dataType: (0, pg_core_1.varchar)('data_type', { length: 256 }).notNull(),
    brandOwner: (0, pg_core_1.varchar)('brand_owner', { length: 256 }).default(''),
    gtinUpc: (0, pg_core_1.text)('gtin_upc').default(''),
    ndbNumber: (0, pg_core_1.integer)('ndb_number').default(0),
    publishedDate: (0, pg_core_1.varchar)('publication_date', { length: 10 }),
    foodNutrients: (0, pg_core_1.json)('food_nutrients').default([]),
    brandName: (0, pg_core_1.varchar)('brand_name', { length: 256 }).default(''),
    ingredients: (0, pg_core_1.text)('ingredients').default(''),
    marketCountry: (0, pg_core_1.varchar)('market_country', { length: 256 }).default(''),
    foodCategory: (0, pg_core_1.varchar)('food_category', { length: 256 }).default(''),
    modifiedDate: (0, pg_core_1.varchar)('modified_date', { length: 10 }),
    dataSource: (0, pg_core_1.varchar)('data_source', { length: 256 }).default(''),
    packageWeight: (0, pg_core_1.varchar)('package_weight', { length: 256 }).default(''),
    servingSizeUnit: (0, pg_core_1.varchar)('serving_size_unit', { length: 256 }).default(''),
    servingSize: (0, pg_core_1.doublePrecision)('serving_size').default(0),
    householdServingFullText: (0, pg_core_1.varchar)('household_serving_full_text', {
        length: 256,
    }).default(''),
    tradeChannels: (0, pg_core_1.json)('trade_channels').default([]),
    allHighlightFields: (0, pg_core_1.text)('all_highlight_fields').default(''),
    score: (0, pg_core_1.doublePrecision)('score').default(0),
    microbes: (0, pg_core_1.json)('microbes').default([]),
    aggregations: (0, pg_core_1.json)('aggregations').default({}),
    nutrients: (0, pg_core_1.json)('nutrients').default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    UpdatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
