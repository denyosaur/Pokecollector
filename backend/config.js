"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "ash-secret-key";

const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
/** Shared config for application; can be required many places. */
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "pokecollector_test"
        : process.env.DATABASE_URL || "pokecollector";
}



const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

console.log("Pokecollector Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};
