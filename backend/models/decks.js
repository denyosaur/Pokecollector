"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressErrors");
const CardsInDecks = require("./cards_in_decks")

/* Functions for Deck Building */

class Deck {
    constructor(id, username, deckName, deckImage, deckCards = {}) {
        this.deckId = id;
        this.username = username;
        this.deckName = deckName;
        this.deckImage = deckImage;
        this.deckCards = deckCards
    };

    /* Create New Card Deck
    make a query to find the user ID of user from username
    make query to INSERT a new entry with user ID and deck name
    returns object: {id, username, deckName}
    */
    static async createDeck(username, deckName, image = "https://i.imgur.com/QykX2aC.jpg") {

        const deckResult = await db.query(`INSERT INTO decks
                                           (username, deck_name, deck_image)
                                           VALUES ($1, $2, $3)
                                           RETURNING id, username AS "newUsername", deck_name AS "newDeckName", deck_image AS "newDeckImage"`, [username, deckName, image]);

        const { id, newUsername, newDeckName, newDeckImage } = deckResult.rows[0];

        return new Deck(id, newUsername, newDeckName, newDeckImage);
    };

    /* Get All Deck that the User Owns
    makes an initial query to get user's ID
    then makes a query to pull all the decks that the user owns
    returns array [{deckName1}, {deckName2}, ...]
    */
    static async getAllDecks(uname) {
        const result = await db.query(`SELECT id, username, deck_name AS "deckName", deck_image AS "deckImage"
                                       FROM decks
                                       WHERE username = $1
                                       ORDER BY deck_name`, [uname]);

        const decks = result.rows.map(deck => {
            const { id, username, deckName, deckImage } = deck;
            return new Deck(id, username, deckName, deckImage);
        })

        return decks;
    };

    /* Get A deck user owned by deck name and username
    makes an initial query to get user's ID
    then makes a query to pull all the decks that the user owns
    returns object {id, username, deckName}
    */
    static async getDeck(deckId) {
        const result = await db.query(`SELECT id, username, deck_name AS "deckName", deck_image AS "deckImage"
                                       FROM decks
                                       WHERE id = $1`, [deckId]);

        if (!result.rows[0]) throw new NotFoundError(`No Deck with ID of ${deckId}`);

        const { id, username, deckName, deckImage } = result.rows[0];

        return new Deck(id, username, deckName, deckImage);
    };

    // SELECT id, username, deck_name AS "deckName", deck_image AS "deckImage"
    // FROM decks
    // WHERE id = $1

    /* Update Card Deck Name
    accepts username and an object named data {currentDeckName, updatedDeckName}
    check if currentDeckName in data object exists in decks. if not, throw BadRequestError
    make query request to change the currentDeckName to updatedDeckName
    return newDeckName 
    */
    async updateInfo(newDeckName, newDeckImage) {
        const result = await db.query(`UPDATE decks
                                       SET deck_name = $1, deck_image = $2
                                       WHERE id = $3
                                       RETURNING id, username, deck_name AS "deckName", deck_image AS "deckImage"`, [newDeckName, newDeckImage, this.deckId]);

        const { id, username, deckName, deckImage } = result.rows[0];

        return new Deck(id, username, deckName, deckImage);
    };

    /* Delete Card Deck
    make query to DELETE entry with matching username and ID 
    if it doesn't exist, throw NotFoundError
    returns object: {id, username, deckName}
    */
    async delete() {
        const result = await db.query(`DELETE 
                                       FROM decks
                                       WHERE id = $1
                                       RETURNING id, username, deck_name AS "deckName"`, [this.deckId]);

        const deck = result.rows[0];
        return deck;
    };

    /* Get all cards from this deck
    call method getAllCards from CardsInDecks with deck ID passed in
    returns object: [{id, name, images, setName, setLogo},...]
    */
    async getCards() {
        const cards = await CardsInDecks.getAllCards(this.deckId);
        return cards;
    };

    /*Update cards in Deck
    call method removeCards from CardsInDecks with deck ID passed in
    if there is no row with matching deck and card ID, throw NotFoundError
    return object 
    {updated:{
        removed: {deckId, cardId}, 
        added:{deckId, cardId}
    }}
    */
    async updateCards(updateArr) {
        const updated = await CardsInDecks.updateDeckCards(this.deckId, updateArr);
        return updated;
    };
};

module.exports = Deck;