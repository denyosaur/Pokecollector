"use strict";

/* Routes for Users */

const express = require("express");

const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");

const Users = require("../models/users");

const { createToken } = require("../helpers/token-helpers");

const { jsonValidate } = require("../helpers/jsonvalidator-helpers");
const userNewAdminSchema = require("../schemas/userNewAdmin.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/*********CORRECT USER OR ADMIN ONLY*********/

/* GET user/:username =>  { username, firstName, lastName, email, isAdmin, currencyAmount }
Returns user info - Correct User or Admin Only
*/
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { username } = req.params;

        const user = await Users.getUser(username);

        return res.json({ user });
    } catch (error) {
        return next(error);
    };
});

/* PATCH user/:username =>  { user }
update user info - Correct User or Admin Only
check inputs against jsonschema to validate that inputs are correct.if not throw BadRequestError
send req.body(contains changes) and username to updateUserInfo
return user object {updatedUser:{ username, firstName, lastName, email, isAdmin, currencyAmount }}
*/
router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, userUpdateSchema); //json validator helper function

        const { username } = req.params;

        const user = await Users.getUser(username);
        const updatedUser = await user.updateUserInfo(req.body);

        return res.json({ updatedUser });
    } catch (error) {
        return next(error);
    };
});



/* DELETE /[username]  =>  { deleted: username }
deletes user info and cards owned - Correct User or Admin Only
pass in user's username to User.deleteUser which deletes and returns username
return json object 
*/
router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { username } = req.params;

        const user = await Users.getUser(username);

        await user.delete();

        return res.status(201).json({ deleted: user });
    } catch (error) {
        return next(error);
    };
});

/*********ADMIN ONLY*********/

/* GET user/ {user} =>  { users: [ {username, firstName, lastName, email }, ... ] }
Returns list of all users - admin only
user findAll method from User to fetch list of all users
return user object {users: [{ username, firstName, lastName},...]}
*/
router.get("/admin/allusers", ensureAdmin, async function (req, res, next) {
    try {
        const users = await Users.findAll();

        return res.json({ users });
    } catch (error) {
        return next(error);
    };
});

/* POST user/ {user} => {user, token}
create a new user. can set to admin - admin only
check inputs against jsonschema to validate that inputs are correct. if not throw BadRequestError
pass in req.body to User.register to create new account.
return newAdmin and token { newAdmin, token }
*/
router.post("/admin/createuser", ensureAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, userNewAdminSchema); //json validator helper function

        const { username, password, firstName, lastName, email, isAdmin } = req.body;

        const newAdmin = await Users.register(username, password, firstName, lastName, email, isAdmin);
        const token = createToken(newAdmin);

        return res.status(201).json({ newAdmin, token });
    } catch (error) {
        return next(error);
    };
});

module.exports = router;