"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
async function main() {
    const pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const db = (0, node_postgres_1.drizzle)(pool);
    console.log(`[migrate] Running migrations ...`);
    await (0, migrator_1.migrate)(db, { migrationsFolder: "./src/db/drizzle" });
    console.log(`[migrate] All migrations ran successfully, exiting ...`);
    await pool.end();
}
main();
