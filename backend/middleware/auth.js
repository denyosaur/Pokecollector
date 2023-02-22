"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../expressErrors");

/*
Middleware for authenticating user.
if token is given, verify using jwt. If valid, store token payload on res.locals.
not an error if there is no token.
Store username and isAdmin for future authorization.
*/
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;

        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (error) {
        return next(error);
    };
};

/*
Middleware for checking a user is logged in correctly. If not, throw UnauthorizedError.
*/
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (error) {
        return next(error);
    };
};

/*
Middleware for checking if user is logged in and is an admin. If not, throw UnauthorizedError.
check if user is logged in, and then check if user is admin
*/
function ensureAdmin(req, res, next) {
    try {
        const user = res.locals.user;

        if (!user || !user.isAdmin) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (error) {
        return next(error);
    };
};

/*
Middleware for checking if admin is logged in. If not, throw UnauthorizedError.
*/
function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;

        if (!(user && (user.isAdmin || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (error) {
        return next(error);
    };
};

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,
};
