"use strict";

const db = require("../db");

const Cards = require("./cards");

const { BadRequestError } = require("../expressErrors");

/* Functions for cards that users own */

class UsersCards {
    constructor(id, username, cardId, cardInfo = null) {
        this.ownedId = id;
        this.username = username;
        this.cardId = cardId;
        this.cardInfo = cardInfo;
    };

    /* Get all User's Cards
    First, make a db query to check if user with username exists. if not, throw NotFoundError
    make query to get all card IDs that the user owns
    return cardInfos [{ownedId, username, cardId, cardInfo},...]
    */
    static async getUsersCards(username) {
        const cardsResult = await db.query(`SELECT u.id AS "ownedId", 
                                                   u.card_id AS "cardId", 
                                                   u.username,
                                                   cards.id,
                                                   cards.name, 
                                                   cards.supertype, 
                                                   cards.subtypes, 
                                                   cards.hp, 
                                                   cards.types, 
                                                   cards.evolves_to AS "evolvesTo", 
                                                   cards.rules, 
                                                   cards.attacks, 
                                                   cards.weaknesses, 
                                                   cards.resistances, 
                                                   cards.retreat_cost AS "retreatCost", 
                                                   cards.converted_retreat_cost AS "convertedRetreatCost", 
                                                   cards.set_name AS "setName", 
                                                   cards.set_logo AS "setLogo", 
                                                   cards.artist, 
                                                   cards.rarity, 
                                                   cards.national_pokedex_numbers AS "nationalPokedexNumbers", 
                                                   cards.legalities, 
                                                   cards.images, 
                                                   cards.tcgplayer, 
                                                   cards.prices
                                            FROM users_cards u
                                            INNER JOIN cards ON u.card_id = cards.id
                                            WHERE u.username = $1`, [username]);

        const ownedCards = cardsResult.rows.map(cardData => {
            const { ownedId, cardId, username, id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices } = cardData;

            const cardInfo = new Cards(id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices);

            const usersCardsInfo = new UsersCards(ownedId, username, cardId, cardInfo);

            return usersCardsInfo;
        })

        return ownedCards;
    };

    static async searchUserCards({ name, minPrice, maxPrice, rarity, types, setName } = {}, usersName) {
        let query = `SELECT u.id AS "ownedId", 
                            u.card_id AS "cardId", 
                            u.username,
                            cards.id,
                            cards.name, 
                            cards.supertype, 
                            cards.subtypes, 
                            cards.hp, 
                            cards.types, 
                            cards.evolves_to AS "evolvesTo", 
                            cards.rules, 
                            cards.attacks, 
                            cards.weaknesses, 
                            cards.resistances, 
                            cards.retreat_cost AS "retreatCost", 
                            cards.converted_retreat_cost AS "convertedRetreatCost", 
                            cards.set_name AS "setName", 
                            cards.set_logo AS "setLogo", 
                            cards.artist, 
                            cards.rarity, 
                            cards.national_pokedex_numbers AS "nationalPokedexNumbers", 
                            cards.legalities, 
                            cards.images, 
                            cards.tcgplayer, 
                            cards.prices
                    FROM users_cards u
                    INNER JOIN cards ON u.card_id = cards.id`;
        let whereExpressions = []; //array to hold the parts of the WHERE constraints
        let queryValues = []; //array to hold the values used to replace

        //name, minPrice, maxPrice, rarity, types, setName are all the possible saerch terms.
        //for each search query, create and push into where expressions the SQL syntax.
        if (name) { //name query
            queryValues.push(`%${name}%`);
            whereExpressions.push(`cards.name ILIKE $${queryValues.length} `);
        }
        if (minPrice !== undefined) {//minimum price query
            queryValues.push(minPrice);
            whereExpressions.push(`cards.prices >= $${queryValues.length} `);
        };
        if (maxPrice !== undefined) {//maximum price query
            queryValues.push(maxPrice);
            whereExpressions.push(`cards.prices <= $${queryValues.length} `);
        };
        if (rarity !== undefined) {//rarity query
            queryValues.push(rarity);
            whereExpressions.push(`cards.rarity ILIKE $${queryValues.length} `);
        };
        if (types !== undefined) {//types query, searches through array in SQL
            queryValues.push(types);
            whereExpressions.push(`$${queryValues.length}=ANY(cards.types)`);
        };
        if (setName !== undefined) {//set name query
            queryValues.push(setName);
            whereExpressions.push(`cards.set_name = $${queryValues.length} `);
        };

        queryValues.push(usersName);
        whereExpressions.push(`u.username = $${queryValues.length} `);

        //Create Where statement by combining all search queries from above
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ")
        }

        //finalize query by adding ORDER BY name by default
        query += " ORDER BY name";

        const cardResults = await db.query(query, queryValues);

        const ownedCards = cardResults.rows.map(cardData => {
            const { ownedId, cardId, username, id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices } = cardData;

            const cardInfo = new Cards(id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices);

            const usersCardsInfo = new UsersCards(ownedId, username, cardId, cardInfo);

            return usersCardsInfo;
        })

        return ownedCards;
    };


    /* Add new card to user
    First, make a db query to check if the card with cardId exists. if not, throw NotFoundError
    Second, make a db query to check if user already owns the card
        if user owns the card, increment by 1
        if not, INSERT a new entry with card
    return card object {id, username, cardId}
    */
    static async createNewCard(newUsername, newCardId) {
        const result = await db.query(`INSERT INTO users_cards
                                       (username, card_id)
                                       VALUES ($1, $2)
                                       RETURNING id, username, card_id AS "cardId"`, [newUsername, newCardId]);

        const cardInfo = await Cards.getCardInfo(newCardId);

        const { id, username, cardId } = result.rows[0];

        return new UsersCards(id, username, cardId, cardInfo);
    };

    /* Add Multiple Cards to a User - used for buying cards
    cart = {cardID1: {quantity}, cardID2: {quantity},...}
    for each card in cart object, push cart key to cardsToAdd based on quantity
    return an array of objects [{UsersCards},...]
    */
    static async createCardsToUser(username, cart) {
        let cardsToAdd = [];
        Object.keys(cart).map(id => {
            let number = cart[id].quantity;
            while (number > 0) {
                cardsToAdd.push(id);
                number--;
            };
        });

        const cards = await Promise.all(cardsToAdd.map(async (cardId) => {
            const newCard = await this.createNewCard(username, cardId);
            return newCard;
        }));

        return cards;
    };

    /* support function used to transfer ownership of cards in users_card*/
    static async _transfer(oldOwner, newOwner, toTrade) {
        const transferRes = await Promise.all(toTrade.map(async (cardId) => {
            const updateOwner = await db.query(`UPDATE users_cards
                                                SET username=$1
                                                WHERE username=$2 AND card_id=$3
                                                RETURNING id, username, card_id AS "cardId"`, [newOwner, oldOwner, cardId]);

            return updateOwner.rows[0];
        }));

        return transferRes;
    };

    /* support function to check if use owns the cards*/
    static async _checkOwnership(username, toTrade) {
        const searchStr = toTrade.join(", ")
        const check = await db.query(`SELECT id, username, card_id AS "cardId"
                                      FROM users_cards
                                      WHERE username = $1 AND card_id IN ($2)`, [username, searchStr]);
        if (check.rows.length !== toTrade.length) throw new BadRequestError(`User ${username}, does not own the selected cards.`)
    };

    /* Make Trade - used with Trades.acceptOffer()
    take in seller id, buyer id, and offers
    use addCardToUser and removeCardFromUser to add and remove cards accordingly
    */
    async makeTrade(sellerName, buyerName, sellerOffer, buyerOffer) {
        await this._checkOwnership(sellerName, sellerOffer);
        await this._checkOwnership(buyerName, buyerOffer);

        const buyersNew = await this._transfer(sellerName, buyerName, sellerOffer);
        const sellersNew = await this._transfer(buyerName, sellerName, buyerOffer);

        return { buyersNew, sellersNew };
    };
};

module.exports = UsersCards;