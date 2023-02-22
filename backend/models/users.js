"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql-helpers");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressErrors");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/* Functions for Users */

class Users {
    constructor(username, firstName, lastName, email, currencyAmount = 1000, isAdmin = false) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.currencyAmount = currencyAmount;
        this.email = email;
        this.isAdmin = isAdmin
    }
    /* Authenticating a Login 
    db.query user information to pull information from user
    if user object contains key-value pairs, use bcrypt to compare the hashed password and the user input password.
    if bcrypt.compare passes, return user object: { id, username, firstName, lastName, email, currencyAmount, isAdmin, currencyAmount }
    else, throw UnauthorizedError
    */
    static async authenticate(uname, password) {
        const result = await db.query(
            `SELECT username,
                    password AS "hashedPassword",
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    currency_amount AS "currencyAmount",
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
            [uname]);
        const { username, hashedPassword, firstName, lastName, email, currencyAmount, isAdmin } = result.rows[0];

        if (result.rows[0]) {
            const isValid = await bcrypt.compare(password, hashedPassword);
            if (isValid) {
                return new Users(username, firstName, lastName, email, currencyAmount, isAdmin);
            }
        };

        throw new UnauthorizedError("Invalid username/password");
    };

    /*
    Registering a New User
        make a request to pull the new username to check if it exists
        hash password using bcrypt - this will be saved in the database
        make a db.query to create user which returns information about the new user
        return new user object: { username, firstName, lastName, email, isAdmin, currencyAmount }
    */
    static async register(uname, password, fName, lName, newEmail, admin = false, currency = 1000) {
        const duplicateCheck = await db.query(`SELECT username, email 
                                               FROM users 
                                               WHERE username = $1 OR email = $2`, [uname, newEmail]);
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate username or email`);

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(`INSERT INTO users
                                       (username, password, first_name, last_name, email, currency_amount, is_admin)
                                       VALUES ($1,$2,$3,$4,$5,$6,$7)
                                       RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_Admin AS "isAdmin", currency_amount AS "currencyAmount"`,
            [uname, hashedPassword, fName, lName, newEmail, currency, admin]);

        const { username, firstName, lastName, email, currencyAmount, isAdmin } = result.rows[0];

        return new Users(username, firstName, lastName, email, currencyAmount, isAdmin);
    };

    /*
    Find All Users
        create a sql query request for all user's usernam, first name, and last name. Order it by username
        return array of objects: [{ username, firstName, lastName},...]
    */
    static async findAll() {
        const result = await db.query(`SELECT username,
                                              first_name AS "firstName",
                                              last_name AS "lastName",
                                              email,
                                              currency_amount AS "currencyAmount",
                                              is_admin AS "isAdmin"
                                       FROM users 
                                       ORDER BY username;`);
        const allUsers = result.rows.map(user => {
            const { username, firstName, lastName, email, currencyAmount, isAdmin } = user;
            return new Users(username, firstName, lastName, email, currencyAmount, isAdmin);
        })
        return allUsers;
    };

    /*
    Get User Info and the Cards they Own
        create a sql query to pull information form a user. Create the user variable to hold the information
        throw a NotFoundError if there are no matching usernames.
        return the user object: { username, firstName, lastName, email, isAdmin, currencyAmount, [cardIds] }
    */
    static async getUser(uname) {
        const userRes = await db.query(`SELECT username,
                                               first_name AS "firstName",
                                               last_name AS "lastName",
                                               email,
                                               currency_amount AS "currencyAmount",
                                               is_admin AS "isAdmin"
                                        FROM users 
                                        WHERE username = $1`, [uname]);

        if (!userRes.rows[0]) throw new NotFoundError(`No user with username: ${uname}`);
        //create variable to hold only user information
        const { username, firstName, lastName, email, currencyAmount, isAdmin } = userRes.rows[0];

        //throw NotFoundError if the username doesn't exist


        return new Users(username, firstName, lastName, email, currencyAmount, isAdmin);
    };

    /*
    Update User's Own Info
        can only patch first name, last name, email, and password
        data should contain {
            firstName,
            lastName,
            email,
            currency,
            password, //new password
            currPassword, //old password
            username
        }
        user currPassword to check that it matches with old password in DB. if incorrect, throw BadRequestError
        use bcrypt to hash the new password.
        use sqlForPartialUpdate helper to create SQL syntax for inserting updated data
        return the user object: {user:{ username, firstName, lastName, email, isAdmin, currencyAmount }}
    */
    async updateUserInfo(data) {
        const res = await db.query(`SELECT password
            FROM users 
            WHERE username = $1`, [this.username]);
        const hasedPassword = res.rows[0].password;
        const isValidPassword = await bcrypt.compare(data.currPassword, hasedPassword);
        if (!isValidPassword) throw new BadRequestError("Incorrect current password. Please re-enter your current password.");
        delete data.currPassword;

        //hash the new password
        if (data.password) data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);



        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
                password: "password",
                email: "email"
            }
        );

        const usernameIdx = values.length + 1;
        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = $${usernameIdx}
                          RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email,
                                    currency_amount AS "currencyAmount",
                                    is_admin AS "isAdmin"`;

        const result = await db.query(querySql, [...values, this.username]);
        const { username, firstName, lastName, email, currencyAmount, isAdmin } = result.rows[0];

        if (!result) throw new NotFoundError(`No user with username: ${this.username}`);

        return new Users(username, firstName, lastName, email, currencyAmount, isAdmin);
    };

    /* Remove Amount from User's amount
    make a db request to check if username exists. if not, throw NotFoundError
    if user's current amount is greater than or equal to "amount to remove", make an update set the new amount
        return object of username and new currencyAmount {username, currencyAmount}
    else, throw BadRequestError for lack of funds
    */
    async removeAmount(amount) {
        if (this.currencyAmount >= amount) {
            const newAmount = this.currencyAmount - amount;
            const updated = await db.query(`UPDATE users
                                            SET currency_amount = $1
                                            WHERE username = $2
                                            RETURNING username, currency_amount AS "currencyAmount"`, [newAmount, this.username]);

            const updatedAmount = updated.rows[0];
            return updatedAmount;
        } else {
            throw new BadRequestError(`Not Enough Funds`);
        };
    };

    /*Add Amount to User's amount
    make a db request to check if username exists. if not, throw NotFoundError
    make an update query to increase user's currency_amount by the amount passed in
    return object of username and new currencyAmount {username, currencyAmount}
    */
    async addAmount(amount) {
        const newAmount = parseInt(this.currencyAmount) + amount;

        const updated = await db.query(`UPDATE users
                                        SET currency_amount = $1
                                        WHERE username = $2
                                        RETURNING username, currency_amount AS "currencyAmount"`, [newAmount, this.username]);

        const updatedAmount = updated.rows[0];

        return updatedAmount;
    };


    /*
    Delete a User 
    create a sql query to delete a user by username. 
    if username is not found, throw a NotFoundError
    returns username
    */
    async delete() {
        const result = await db.query(`DELETE 
                                       FROM users
                                       WHERE username = $1
                                       RETURNING username`, [this.username]
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user with username: ${this.username}`);

        return user;
    };
}
module.exports = Users;