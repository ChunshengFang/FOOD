"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../db/schema");
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const fetchAllReviewsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const items = await db_1.db.query.reviews.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.reviews.userId, userId),
        });
        res.status(201).json({ data: items });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
const addReviewToRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.userId;
    let { rating, message } = req.body;
    try {
        rating = rating === undefined ? 3 : rating; //  default is 3
        message = message === undefined ? '' : message;
        // check recipe
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.id, recipeId),
        });
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        const review = await db_1.db
            .insert(schema_1.reviews)
            .values({
            userId,
            recipeId,
            rating,
            message,
            createdAt: new Date(),
        })
            .returning();
        if (!review || review.length < 1) {
            res.status(400);
            throw new Error('Recipe creation failed, something went wrong!');
        }
        res.status(201).json(review[0]);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const fetchAllReviewsByRecipeId = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const _items = await db_1.db.query.reviews.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.reviews.recipeId, recipeId),
            with: {
                user: true,
            },
        });
        const items = _items.map((item) => {
            return {
                id: item.id,
                userId: item.user.id,
                username: item.user.username,
                userAvatarUrl: item.user.avatarUrl,
                rating: item.rating,
                message: item.message,
                createdAt: item.createdAt,
            };
        });
        res.status(201).json({ items });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.default = {
    fetchAllReviewsByUserId,
    addReviewToRecipe,
    fetchAllReviewsByRecipeId,
};
