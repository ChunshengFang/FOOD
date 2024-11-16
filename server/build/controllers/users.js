"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const helpers_1 = require("../utils/helpers");
const fetchAllUsers = async (req, res) => {
    const page = req.query['page'] ? Number(req.query['page']) : 1;
    const limit = req.query['limit'] ? Number(req.query['limit']) : 12;
    // TODO： for admin only.
    try {
        const usersCountList = await db_1.db
            .select({ value: (0, drizzle_orm_1.count)(schema_1.users.id) })
            .from(schema_1.users);
        const allUsers = await db_1.db.query.users.findMany({
            limit,
            offset: (page - 1) * limit,
            columns: {
                createdAt: false,
                UpdatedAt: false,
                password: false,
                bio: false,
                // id: false,
            },
        });
        if (!allUsers || allUsers.length < 1) {
            res.status(404);
            throw new Error('No user found in the database!');
        }
        const pagesCount = Math.ceil(usersCountList[0].value / limit);
        res.json({
            pagesCount,
            users: allUsers,
            usersCount: usersCountList[0].value,
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const signUpAUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            res.status(403);
            throw new Error('All fields are required!');
        }
        const user = (await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.username, username),
            columns: { id: true },
        })) ||
            (await db_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
                columns: { id: true },
            }));
        if (user) {
            res.status(403);
            throw new Error('User with the credentials found in the DB!');
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        const newUser = await db_1.db
            .insert(schema_1.users)
            .values({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        })
            .returning();
        if (!newUser || newUser.length < 1) {
            res.status(400);
            throw new Error('User creation failed, something went wrong!');
        }
        (0, helpers_1.generateToken)(res, { id: newUser[0].id });
        const userObj = Object.assign({}, newUser[0]);
        delete userObj.password;
        res.status(201).json(userObj);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const signInAUser = async (req, res) => {
    const { login, password } = req.body;
    try {
        if (!login || !password) {
            res.status(403);
            throw new Error('All fields are required!');
        }
        const user = (await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.username, login),
        })) ||
            (await db_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.users.email, login),
            }));
        if (!user) {
            res.status(404);
            throw new Error('Invalid user credentials!');
        }
        const passwordsMatch = await (0, helpers_1.checkPassword)(password, user.password);
        if (passwordsMatch === false) {
            res.status(400);
            throw new Error('Invalid user credentials!');
        }
        (0, helpers_1.generateToken)(res, { id: user.id });
        const userObj = Object.assign({}, user);
        delete userObj.password;
        // remove password from the response
        res.status(200).json({ user: userObj });
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const signOutAUser = async (req, res) => {
    res
        .cookie(process.env.TOKEN_NAME || 'ts-node', '', {
        httpOnly: true,
        maxAge: 0,
    })
        .json({ message: 'logout successful' });
};
const getAUserByCookie = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, userId),
            columns: { id: false, password: false },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        res.json(user);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const updateAUserByCookie = async (req, res) => {
    const userId = req.userId;
    let { password, age, bio, avatarUrl, interests } = req.body;
    try {
        if (Object.keys(req.body).length < 1) {
            res.status(403);
            throw new Error("Can't update nothing at all now, can you?");
        }
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, userId),
            columns: { id: false },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        age !== undefined ? age : user.age;
        bio !== undefined ? bio : user.bio;
        avatarUrl !== undefined ? avatarUrl : user.avatarUrl;
        interests !== undefined ? interests : user.interests;
        if (password !== undefined) {
            const hashedPassword = await (0, helpers_1.hashPassword)(password);
            password = hashedPassword;
        }
        else {
            password = user.password;
        }
        const results = await db_1.db
            .update(schema_1.users)
            .set({
            age,
            bio,
            password,
            avatarUrl,
            interests,
            UpdatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
            .returning();
        if (!results || results.length < 1) {
            res.status(400);
            throw new Error('Failed to update user, something went wrong!');
        }
        const userObj = Object.assign({}, results[0]);
        delete userObj.password;
        res.json(userObj);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const deleteAUserByCookie = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, userId),
            columns: { id: false },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        const results = await db_1.db
            .delete(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
            .returning();
        if (!results || results.length < 1) {
            res.status(400);
            throw new Error('Failed to delete user, something went wrong!');
        }
        res
            .cookie(process.env.TOKEN_NAME || 'ts-node', '', {
            httpOnly: true,
            maxAge: 0,
        })
            .json({
            message: `User "${results[0].username}" deleted successfully!`,
        });
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const followAUser = async (req, res) => {
    const userId = req.userId;
    let { followingId } = req.body;
    try {
        if (!followingId) {
            res.status(403);
            throw new Error('No user id provided to follow!');
        }
        if (followingId === userId) {
            res.status(403);
            throw new Error('You cannot follow yourself!');
        }
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, followingId),
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        // check if user is already following
        const isFollowing = await db_1.db.query.follows.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.follows.userId, userId), (0, drizzle_orm_1.eq)(schema_1.follows.followingId, followingId)),
            columns: { id: false },
        });
        if (isFollowing) {
            res.status(403);
            throw new Error('User already followed!');
        }
        const results = await db_1.db
            .insert(schema_1.follows)
            .values({
            userId,
            followingId,
        })
            .returning();
        if (!results || results.length < 1) {
            res.status(400);
            throw new Error('Failed to follow user, something went wrong!');
        }
        res.json({ message: 'User followed successfully!' });
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
const fetchAllUsersByNameAndInterests = async (req, res) => {
    // TODO: implement this
    const { keyword } = req.query;
    // check if keyword is provided
    if (!keyword) {
        res.status(403);
        throw new Error('No keyword provided!');
    }
    try {
        const _users = await db_1.db.query.users.findMany({
            where: (0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(schema_1.users.username, `%${keyword}%`), (0, drizzle_orm_1.like)(schema_1.users.interests, `%${keyword}%`)),
            columns: {
                id: true,
                username: true,
                avatarUrl: true,
                interests: true,
            },
        });
        if (!_users || _users.length < 1) {
            res.status(404);
            throw new Error('No user found!');
        }
        res.json(_users);
    }
    catch (err) {
        return res.json({ message: err.message });
    }
};
exports.default = {
    fetchAllUsers,
    signUpAUser,
    signInAUser,
    signOutAUser,
    getAUserByCookie,
    updateAUserByCookie,
    deleteAUserByCookie,
    followAUser,
    fetchAllUsersByNameAndInterests,
};
