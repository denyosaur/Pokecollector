"use strict";

/* Routes for Purchasing and Removing/Adding Funds */

const express = require("express");

const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

const UsersCards = require("../models/users_cards");
const Users = require("../models/users");

const { jsonValidate } = require("../helpers/jsonvalidator-helpers");
const storeFundsUpdate = require("../schemas/storeFundsUpdate.json");

const router = new express.Router();

/* POST /store/:username => {newCards:[{id, username, cardId},...]}
post new cards to users_cards table
exmple cart = [id1, id2, id3, ...]
*/
router.post("/:username/purchase", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { cart } = req.body;
        const { username } = req.params;

        const newCards = await UsersCards.createCardsToUser(username, cart);

        return res.status(201).json({ newCards });
    } catch (error) {
        return next(error);
    };
});

/* PATCH /store/:username/removeFunds => {updatedAmount:{username, currencyAmount}}
patch the current currency amount by the amount passed in 
*/
router.patch("/:username/removeFunds", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, storeFundsUpdate); //json validator helper function

        const { funds } = req.body;
        const { username } = req.params;

        const user = await Users.getUser(username);
        const updatedAmount = await user.removeAmount(funds);

        return res.json({ updatedAmount });
    } catch (error) {
        return next(error);
    };
});

/* PATCH /store/:username/addFunds => {updatedAmount:{username, currencyAmount}}
patch the current currency amount by the amount passed in 
*/
router.patch("/:username/addFunds", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, storeFundsUpdate); //json validator helper function

        const { funds } = req.body;
        const { username } = req.params;

        const user = await Users.getUser(username);
        const updatedAmount = await user.addAmount(funds);

        return res.json({ updatedAmount });
    } catch (error) {
        return next(error);
    };
});

module.exports = router;