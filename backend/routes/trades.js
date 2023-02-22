"use strict";

/* Routes for Handling Trades Between Users */

const express = require("express");

const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

const Trades = require("../models/trades");
const Messages = require("../models/messages");

const { jsonValidate } = require("../helpers/jsonvalidator-helpers");
const tradesNewSchema = require("../schemas/tradesNew.json");
const messageNewSchema = require("../schemas/messageNew.json");
const messageUpdateSchema = require("../schemas/messageUpdate.json");

const router = express.Router();



/* GET trades/ => {trades:[{id, sellerId, buyerId, sellerOffer, buyerOffer}, ...]}
all trades for a user
*/
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { username } = req.params;

        const trades = await Trades.getAllUserTrades(username);

        return res.json(trades);
    } catch (error) {
        return next(error);
    };
});

/* GET trades/:id => {trade:{id, sellerId, buyerId, sellerOffer, buyerOffer}}
get information about a specific trade
*/
router.get("/:username/:tradeId", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { tradeId } = req.params;

        const trade = await Trades.getTrade(tradeId);

        return res.json({ trade });
    } catch (error) {
        return next(error);
    };
});

/* POST trades/:username/ => {id, sellerId, buyerId, sellerOffer, buyerOffer}
req.body will contain - seller buyer username and offers (seller and buyer)
create a new trade with offers
*/
router.post("/:username/create", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, tradesNewSchema); //json validator helper function

        const trade = await Trades.createTrade(req.body);

        return res.status(201).json({ trade });
    } catch (error) {
        return next(error);
    };
});

/* POST trades/:username/:tradeId/sendMessage => {message:{tradeId, userId, message, timestamp}}
post a new entry in the messages table 
*/
router.post("/:username/:tradeId/sendMessage", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, messageNewSchema); //json validator helper function

        const { message } = req.body;
        const { username, tradeId } = req.params;

        const msg = await Messages.createMessage(tradeId, username, message);

        return res.status(201).json({ message: msg });
    } catch (error) {
        return next(error);
    };
});

/* PATCH trades/:username/:msgId => { updated: {id, tradeId, userId, message, timestamp} }
route that updates message 
req.body.editMessage should be text
*/
router.patch("/:username/:msgId", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, messageUpdateSchema); //json validator helper function

        const { editedMsg } = req.body;
        const { msgId } = req.params;

        const msg = await Messages.getMessage(msgId);
        const updated = await msg.editMessage(editedMsg);

        return res.json({ updated: updated });
    } catch (error) {
        return next(error);
    };
});


/* PATCH trades/:username/:tradeId => {true}
route that accepts trade offer
*/
router.patch("/:username/:tradeId/accept", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { username, tradeId } = req.params;

        const trade = await Trades.getTrade(tradeId);

        const tradeStatus = await trade.acceptOffer(username);

        return res.status(201).json({ completed: tradeStatus });
    } catch (error) {
        return next(error);
    };
});

/* DELETE trades/:username/:tradeId/delete => { deleted: tradeId }
route that deletes trade offer
*/
router.delete("/:username/:tradeId/delete", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { tradeId } = req.params;

        const trade = await Trades.getTrade(tradeId);
        const status = await trade.deleteOffer();

        return res.status(201).json({ deleted: trade, status });
    } catch (error) {
        return next(error);
    };
});


/* DELETE trades/:username/:msgId => { deleted: msgId }
route that deletes message
*/
router.delete("/:username/:msgId/deleteMessage", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { msgId } = req.params;

        const msg = await Messages.getMessage(msgId);
        const updated = await msg.deleteMessage();

        return res.status(201).json({ deleted: msg });
    } catch (error) {
        return next(error);
    };
});

module.exports = router;