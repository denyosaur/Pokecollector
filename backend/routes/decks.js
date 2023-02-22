"use strict";

/* Routes for Deck Building */

const express = require("express");

const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

const Decks = require("../models/decks");

const { jsonValidate } = require("../helpers/jsonvalidator-helpers");
const decksNewSchema = require("../schemas/decksNew.json");
const decksNameUpdateSchema = require("../schemas/decksNameUpdate.json");

const router = new express.Router();


/* GET /decks/:username => {decks:[{deckName1}, {deckName2}, ...]}
get a list of all the decks the user owns
*/
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { username } = req.params;

        const decks = await Decks.getAllDecks(username);

        return res.json({ decks });
    } catch (error) {
        return next(error);
    };
});

/* GET /decks/:username => {deck: {id, username, deckName}, cards: [{id, name, images, setName, setLogo},...]}
get list of all cards in the deck
*/
router.get("/:username/:deckId", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { deckId } = req.params;

        const deck = await Decks.getDeck(deckId);
        const cards = await deck.getCards();

        return res.json({ deck, cards });
    } catch (error) {
        return next(error);
    };
});

/* POST /decks/:username => {deck: {id, username, deckName}}
create a new deck
req.body must contain {username, deckName}
*/
router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, decksNewSchema); //json validator helper function

        const { deckName, deckImage } = req.body;
        const { username } = req.params;

        const deck = await Decks.createDeck(username, deckName, deckImage);

        return res.json({ deck });
    } catch (error) {
        return next(error);
    };
});


/* PATCH /decks/:username => {deck: deckName}
updates name of deck that user owns
req.body = {deckId, newName}
*/
router.patch("/:username/:deckId", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        jsonValidate(req.body, decksNameUpdateSchema); //json validator helper function

        const { deckName, deckImage } = req.body;
        const { deckId } = req.params;

        const deck = await Decks.getDeck(deckId);
        const newDeckName = await deck.updateInfo(deckName, deckImage);

        return res.json({ newDeckName });
    } catch (error) {
        return next(error);
    };
});

/* POST /decks/:username => {updated: {added}, {removed}}
insert or delete cards from deck 
req.body = {
    remove:[id1,...], 
    add:[id1,...]
}
*/
router.patch("/:username/:deckId/update", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { updatedDeck } = req.body;
        const { deckId } = req.params;

        const deck = await Decks.getDeck(deckId);
        const updated = await deck.updateCards(updatedDeck);

        return res.json(updated);
    } catch (error) {
        return next(error);
    };
});

/* DELETE /decks/:username/:deckId => {deleted: {id, username, deckName}}
delete entire deck
*/
router.delete("/:username/:deckId", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const { deckId } = req.params;

        const deck = await Decks.getDeck(deckId);
        await deck.delete();

        return res.json({ "deleted": deck });
    } catch (error) {
        return next(error);
    };
});

module.exports = router;