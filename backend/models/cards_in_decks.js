"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressErrors");

/* Functions for Cards in Decks */

class CardsInDecks {
    constructor(id, ownedId, name, images, setName, setLogo) {
        this.id = id;
        this.ownedId = ownedId;
        this.name = name;
        this.images = images;
        this.setName = setName;
        this.setLogo = setLogo;
    }
    /*Get All Cards in Deck
    make a query request make a new entry with deck ID and card ID
    return addCard [{id, name, images, setName, setLogo},...]
    */
    static async getAllCards(deckId) {
        const cardResults = await db.query(`SELECT u.users_cards_id AS "ownedId",
                                                   c.id, 
                                                   c.name, 
                                                   c.images, 
                                                   c.set_name AS "setName", 
                                                   c.set_logo AS "setLogo"
                                            FROM cards c
                                            INNER JOIN users_cards 
                                                ON c.id = users_cards.card_id
                                            INNER JOIN cards_in_decks u
                                                ON u.users_cards_id = users_cards.id
                                            WHERE u.deck_id = $1`, [deckId]);
        const cards = cardResults.rows.map(card => {
            const { id, ownedId, name, images, setName, setLogo } = card;
            return new CardsInDecks(id, ownedId, name, images, setName, setLogo);
        });

        if (!cards) throw new NotFoundError(`No cards in deck with ID: ${deckId}`);

        return cards;
    };

    /*Add Cards to Deck
    create SQL valid string of [($x, $1), ($x, $2),...] to be used insert query using .map
    make insert into query to add the cards to the deck
    return added cards [{deckId, cardId},...]
    */
    static async _addCards(deckId, addArr) {
        const lastIdx = addArr.length + 1;
        const sqlValues = addArr.map((cardId, idx) => {
            return `($${lastIdx}, $${idx + 1})`
        });
        const sqlString = sqlValues.join(", ");

        const addCard = await db.query(`INSERT INTO cards_in_decks
                                        (deck_id, users_cards_id)
                                        VALUES ${sqlString}
                                        RETURNING deck_id AS "deckId", users_cards_id AS "usersCardId"`, [...addArr, deckId]);

        const addedCards = addCard.rows[0];

        return addedCards;
    };

    /*Remove Card from Deck
    create SQL valid string of [(deck_id = $x AND card_id = $1), (deck_id = $x AND card_id = $2),...] to be used delete query using .map
    make delete query to remove the cards to the deck
    return removed cards [{deckId, cardId},...]
    */
    static async _removeCards(deckId, removeArr) {
        const lastIdx = removeArr.length + 1;
        const sqlValues = removeArr.map((cardId, idx) => {
            return `deck_id=$${lastIdx} AND users_cards_id=$${idx + 1}`
        });
        const sqlString = sqlValues.join(", ");
        const remove = await db.query(`DELETE
                                       FROM cards_in_decks
                                       WHERE ${sqlString}
                                       RETURNING deck_id AS "deckId", users_cards_id AS "usersCardId"`, [...removeArr, deckId]);
        const removedCards = remove.rows[0];

        return removedCards;
    };

    /*Delete all cards from deck
    delete cards from cards_in_deck table by deck ID
    this is used to delete cards and in update cards function
    return {deleted:deckId}
    */
    static async deleteDeck(deckId) {
        await db.query(`DELETE
                        FROM cards_in_decks
                        WHERE deck_id = $1`, [deckId]);

        return { deleted: deckId };
    };

    /*Delete current cards and add new cards to deck - to be used in Decks model
    call this.deleteDeck and create SQL query to create values parameters. 

    return { updatedDeck: updateArr, status: "success" }
    */
    static async updateDeckCards(deckId, updateArr) {
        try {
            await this.deleteDeck(deckId);
            let arrLength = updateArr.length;
            let valuesSqlArr = [];

            while (arrLength > 0) {
                const value = `($1, $${arrLength + 1})`
                valuesSqlArr.push(value);

                arrLength--;
            };

            const res = await db.query(`INSERT INTO cards_in_decks
                        (deck_id, users_cards_id)
                        VALUES ${valuesSqlArr.join(', ')}
                        RETURNING id`, [deckId, ...updateArr]);

            return { updatedDeck: updateArr, status: "success" };
        } catch (error) {
            return error;
        }
    };
};

module.exports = CardsInDecks;
