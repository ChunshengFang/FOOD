"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./utils/middleware");
const server = (0, express_1.default)();
const PORT = process.env.PORT || 8500;
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.use((0, cors_1.default)({ credentials: false }));
if (process.env.NODE_ENV === 'development') {
    server.use((0, morgan_1.default)('dev'));
}
server.use('/api/users', routes_1.default.users);
server.use('/api/recipes', routes_1.default.recipes);
server.use('/api/nutrition', routes_1.default.nutrition);
server.use('/api', routes_1.default.search);
server.use('/api', routes_1.default.rateAndReview);
server.use(middleware_1.notFound);
server.use(middleware_1.errorHandler);
server.listen(Number(PORT), () => console.log(`Server running on port ${PORT}!`));
