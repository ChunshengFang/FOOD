"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = exports.errorHandler = exports.notFound = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const helpers_1 = require("./helpers");
const notFound = (0, express_async_handler_1.default)(async (req, res, next) => {
    res.status(404);
    throw new Error(`Route not found - ${req.originalUrl}`);
});
exports.notFound = notFound;
async function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;
    const stack = process.env.NODE_ENV === "development" ? err.stack : "";
    res.status(statusCode).json({
        message,
        stack,
    });
}
exports.errorHandler = errorHandler;
const loginRequired = (0, express_async_handler_1.default)(async (req, res, next) => {
    const tokenName = process.env.TOKEN_NAME || "ts-node";
    const token = req.cookies[tokenName];
    if (token === undefined || token === "") {
        res.status(401);
        throw new Error("Not authorized, No token!");
    }
    const verified = (0, helpers_1.verifyToken)(token);
    if (!verified) {
        res.status(401);
        throw new Error("Not authorized, Invalid token!");
    }
    req.userId = verified.id;
    next();
});
exports.loginRequired = loginRequired;
