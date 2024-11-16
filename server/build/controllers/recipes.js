"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const fetchAllRecipes = async (req, res) => {
    const page = req.query['page'] ? Number(req.query['page']) : 1;
    const limit = req.query['limit'] ? Number(req.query['limit']) : 12;
    try {
        const recipesCountList = await db_1.db
            .select({ value: (0, drizzle_orm_1.count)(schema_1.recipes.id) })
            .from(schema_1.recipes);
        const allRecipes = await db_1.db.query.recipes.findMany({
            limit,
            offset: (page - 1) * limit,
        });
        if (!allRecipes || allRecipes.length < 1) {
            res.status(404);
            throw new Error('No recipe found in the database!');
        }
        const pagesCount = Math.ceil(recipesCountList[0].value / limit);
        res.json({
            page,
            pagesCount,
            pageSize: limit,
            items: allRecipes,
            total: recipesCountList[0].value,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const addRecipe = async (req, res) => {
    const { title, description, ingredients, dietaryRestrictions, imageUrl } = req.body;
    const userId = req.userId;
    console.log('userId :>> ', userId);
    try {
        if (!title || !description || !ingredients) {
            res.status(403);
            throw new Error('All fields are required! title, description and ingredients are required!');
        }
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.title, title),
            columns: { id: true },
        });
        if (recipe) {
            res.status(403);
            throw new Error('Recipe with the title found in the DB!');
        }
        const user = await db_1.db.query.users.findFirst({
            columns: { id: true },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found in the DB!');
        }
        const newRecipe = await db_1.db
            .insert(schema_1.recipes)
            .values({
            authorId: userId || user.id,
            title,
            description,
            imageUrl,
            ingredients,
            ingredientsText: JSON.stringify(ingredients),
            dietaryRestrictions,
            createdAt: new Date(),
        })
            .returning();
        if (!newRecipe || newRecipe.length < 1) {
            res.status(400);
            throw new Error('Recipe creation failed, something went wrong!');
        }
        res.status(201).json(newRecipe[0]);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const updateRecipeByCookie = async (req, res) => {
    const userId = req.userId;
    let { title, id, description } = req.body;
    console.log('userId :>> ', userId);
    try {
        if (Object.keys(req.body).length < 1) {
            res.status(403);
            throw new Error("Can't update nothing at all now");
        }
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.id, id),
        });
        if (!recipe) {
            res.status(404);
            throw new Error('Recipe not found!');
        }
        console.log('recipe.authorId :>> ', recipe.authorId);
        if (recipe.authorId !== userId) {
            res.status(403);
            throw new Error('You are not allowed to update this recipe!');
        }
        const results = await db_1.db
            .update(schema_1.recipes)
            .set({
            title: title || recipe.title,
            description: description || recipe.description,
            UpdatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.recipes.id, id))
            .returning();
        if (!results || results.length < 1) {
            res.status(400);
            throw new Error('Failed to update recipe, something went wrong!');
        }
        res.json(results[0]);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const deleteRecipeByCookie = async (req, res) => {
    const userId = req.userId;
    let { id } = req.body;
    try {
        if (Object.keys(req.body).length < 1) {
            res.status(403);
            throw new Error("Can't update nothing at all now");
        }
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.id, id),
        });
        if (!recipe) {
            res.status(404);
            throw new Error('Recipe not found!');
        }
        if (recipe.authorId !== userId) {
            res.status(403);
            throw new Error('You are not allowed to delete this recipe!');
        }
        const results = await db_1.db
            .delete(schema_1.recipes)
            .where((0, drizzle_orm_1.eq)(schema_1.recipes.id, id))
            .returning();
        if (!results || results.length < 1) {
            res.status(400);
            throw new Error('Failed to delete recipe, something went wrong!');
        }
        res.json({
            message: `Recipe ${results[0].title} deleted successfully!`,
        });
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const fetchOneRecipe = async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await db_1.db.query.recipes.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.id, id),
            with: {
                author: {
                    columns: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        if (!recipe) {
            res.status(404);
            throw new Error('Recipe not found!');
        }
        res.json(recipe);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const fetchRecipesByUser = async (req, res) => {
    const userId = req.params.userId;
    console.log('fetchRecipesByUser :>> ', userId);
    try {
        const _recipes = await db_1.db.query.recipes.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.recipes.authorId, userId),
        });
        if (!_recipes || _recipes.length < 1) {
            res.status(404);
            throw new Error('No recipe found!');
        }
        res.json(_recipes);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const fetchRecipesByKeyword = async (req, res) => {
    // TODO: search for recipes by keyword
    const { keyword } = req.query;
    console.log('keyword, :>> ', keyword);
    try {
        const _recipes = await db_1.db.query.recipes.findMany({
            where: (0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.recipes.title, `%${keyword}%`), (0, drizzle_orm_1.ilike)(schema_1.recipes.description, `%${keyword}%`), (0, drizzle_orm_1.ilike)(schema_1.recipes.dietaryRestrictions, `%${keyword}%`), (0, drizzle_orm_1.ilike)(schema_1.recipes.ingredientsText, `%${keyword}%`)),
        });
        if (!_recipes || _recipes.length < 1) {
            res.status(404);
            throw new Error('No recipe found!');
        }
        res.json(_recipes);
    }
    catch (err) {
        console.log('err :>> ', err);
        return res.json({ message: err.message });
    }
};
const fetchTrendingRecipes = async (req, res) => {
    // fetch trending recipes， top 10 recipes
    // get all the ratings from all the recipes
    try {
        const _recipes = await db_1.db.query.recipes.findMany({});
        if (!_recipes || _recipes.length < 1) {
            res.status(404);
            throw new Error('No recipe found!');
        }
        const result = [];
        // caculate the average rating of each recipe
        await Promise.all(_recipes.map(async (recipe) => {
            // get all the reviews of this recipe
            const _reviews = await db_1.db.query.reviews.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.reviews.recipeId, recipe.id),
            });
            // caculate the average rating of this recipe
            if (_reviews.length < 1) {
                result.push({
                    recipe,
                    rating: 0,
                });
            }
            else {
                const total_rating = _reviews.reduce((acc, cur) => acc + cur.rating, 0);
                const avg_rating = total_rating / _reviews.length;
                result.push({
                    recipe,
                    rating: avg_rating,
                });
            }
        }));
        res.send(result.sort((a, b) => b.rating - a.rating).slice(0, 10));
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
exports.default = {
    fetchAllRecipes,
    fetchOneRecipe,
    addRecipe,
    updateRecipeByCookie,
    deleteRecipeByCookie,
    fetchRecipesByUser,
    fetchRecipesByKeyword,
    fetchTrendingRecipes,
};
