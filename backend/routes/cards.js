"use strict";

/* Routes for Cards */

const express = require("express");

const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");

const Cards = require("../models/cards");
const UsersCards = require("../models/users_cards");

const router = new express.Router();

/*********NO RESTRICTION*********/

/* GET /cards/ => [{card},...] 
available {query: {
    name, 
    minPrice, 
    maxPrice, 
    rarity, 
    types, 
    setName
}}
*/
router.get("/", async function (req, res, next) {
    const query = req.query;

    //convert minPrice and maxPrice into strings
    if (query.minPrice !== undefined) query.minPrice = +query.minPrice;
    if (query.maxPrice !== undefined) query.maxPrice = +query.maxPrice;

    try {
        const cards = await Cards.findAll(query);

        return res.json({ cards });
    } catch (error) {
        return next(error);
    };
});

/* GET /cardsets => {setNames:[{setName, count},...]}
*/
router.get("/sets/getsetnames", async function (req, res, next) {
    try {
        const sets = await Cards.getCurrentSets();
        const setNames = sets.rows;

        return res.json({ setNames });
    } catch (error) {
        return next(error);
    };
});

/* GET /cards/:cardId => {card}
route to get a specific card's information from db
*/
router.get("/:cardId", async function (req, res, next) {
    try {
        const { cardId } = req.params;

        const card = await Cards.getCardInfo(cardId);

        return res.json({ card });
    } catch (error) {
        return next(error);
    };
});

/*********LOGGED IN*********/

/* GET cards/:username =>  { cards: [{ownedId, username, cardId, cardInfo},...] }
Returns list of cards that user owns - Correct User or Admin Only
*/
router.get("/user/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const { username } = req.params;

        const cards = await UsersCards.getUsersCards(username);

        return res.json({ cards });
    } catch (error) {
        return next(error);
    };
});

/* GET cards/:username/search =>  { cards: [{ownedId, username, cardId, cardInfo},...] }
Returns list of cards that user owns according to search query- Correct User or Admin Only

available {query: {
    name, 
    minPrice, 
    maxPrice, 
    rarity, 
    types, 
    setName
}}

*/
router.get("/user/:username/search", ensureLoggedIn, async function (req, res, next) {
    const query = req.query;

    //convert minPrice and maxPrice into strings
    if (query.minPrice !== undefined) query.minPrice = +query.minPrice;
    if (query.maxPrice !== undefined) query.maxPrice = +query.maxPrice;

    try {
        const { username } = req.params;

        const cards = await UsersCards.searchUserCards(query, username);

        return res.json({ cards });
    } catch (error) {
        return next(error);
    };
});

/*********ADMIN ONLY*********/

/* POST /pullCards/:setId  => {newCards:[{card},...]}
route to pull cards from external API and upload their data to DB
returns newCards object {newCards:[{card},...]}
*/
router.post("/pullCards/:setId", ensureAdmin, async function (req, res, next) {
    try {
        const { setId } = req.params;

        const newCards = await Cards.pullAndPushCards(setId);

        return res.json({ newCards });
    } catch (error) {
        return next(error);
    };
});

/* GET /external/getsets  => { sets }
route to get all sets and their information from external API
returns { sets }
*/
router.get("/external/getsets", ensureAdmin, async function (req, res, next) {
    try {
        const sets = await Cards.getSets()

        return res.json({ sets });
    } catch (error) {
        return next(error);
    };
});

/* GET /external/getcards  => { sets }
route to get all cards from a set and their information from external API
returns { sets }
*/
router.get("/external/getcards/:setId", ensureAdmin, async function (req, res, next) {
    try {
        const { setId } = req.params;
        const cards = await Cards.getCardsFromSet(setId);
        return res.json({ cards });
    } catch (error) {
        return next(error);
    };
});

/* POST /createcard  => { deleted: handle }
route to create a single card from external API
returns newCards object {newCards:[{card},...]}
*/
router.post("/createcard", ensureAdmin, async function (req, res, next) {
    try {
        const cardInfo = req.body;
        const newCards = await Cards.create(cardInfo);

        return res.json({ newCards });
    } catch (error) {
        return next(error);
    };
});

/* DELETE /:cardId  =>  { deletedCard: deleted }
route to delete a card by id - only admins allowed
returns deleted card ID
*/
router.delete("/delete/:cardId", ensureAdmin, async function (req, res, next) {
    try {
        const { cardId } = req.params;

        const card = await Cards.getCardInfo(cardId);
        const deletedCard = await card.delete();

        return res.json({ deletedCard });
    } catch (error) {
        return next(error);
    };
});

module.exports = router;