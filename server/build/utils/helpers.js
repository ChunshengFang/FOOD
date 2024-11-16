"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyText = exports.verifyToken = exports.generateToken = exports.checkPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const slugify_1 = __importDefault(require("slugify"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = (password) => bcryptjs_1.default.hash(password, 10);
exports.hashPassword = hashPassword;
const checkPassword = (inputPassword, hashedPassword) => bcryptjs_1.default.compare(inputPassword, hashedPassword);
exports.checkPassword = checkPassword;
const generateToken = (res, userInfo) => {
    let token = jsonwebtoken_1.default.sign({ ...userInfo }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie(process.env.TOKEN_NAME || "ts-node", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
exports.verifyToken = verifyToken;
const slugifyText = (text) => (0, slugify_1.default)(text, { lower: true, trim: true, remove: /[*+~.:(),?/$#%^&'"!:@]/g });
exports.slugifyText = slugifyText;
