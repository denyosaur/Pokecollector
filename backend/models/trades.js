"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressErrors");

const UsersCards = require("./users_cards")
const Messages = require("./messages")

/* Functions for Trades */

class Trades {
    constructor(id, sellerName, buyerName, sellerOffer, buyerOffer, completed = false, messages = null) {
        this.id = id;
        this.sellerName = sellerName;
        this.buyerName = buyerName;
        this.sellerOffer = sellerOffer;
        this.buyerOffer = buyerOffer;
        this.completed = completed;
        this.messages = messages;
    };

    /* Create a Card Trade
    for each key in usernames, make a query request to fetch IDs. 
    make a db request to insert new trade into trades table
    create a new message using Messages.createMessage
    return new trade object {seller, buyer, sellerOffer, buyerOffer, {message}}
    */
    static async createTrade({ seller, buyer, offers, message }) {
        const { sellerOffer, buyerOffer } = offers;

        const tradeRes = await db.query(`INSERT INTO trades
                                         (seller_name, buyer_name, seller_offer, buyer_offer, completed)
                                         VALUES ($1, $2, $3, $4, $5)
                                         RETURNING id,
                                                   seller_name AS "newSellerName", 
                                                   buyer_name AS "newBuyerName", 
                                                   seller_offer AS "newSellerOffer",
                                                   buyer_offer AS "newBuyerOffer",
                                                   completed`,
            [seller, buyer, sellerOffer, buyerOffer, false]);
        const { id, newSellerName, newBuyerName, newSellerOffer, newBuyerOffer, completed } = tradeRes.rows[0];

        const msg = await Messages.createMessage(id, newSellerName, message);

        const newTrade = new Trades(id, newSellerName, newBuyerName, newSellerOffer, newBuyerOffer, completed, msg);

        return newTrade;
    };

    /* Get trade by ID
    make query to get all information of trade by ID. if trade doesn't exist, throw NotFoundError
    make query to get all messages related to trade and add to new Trades() object
    return the results {id, sellerName, buyerName, sellerOffer, buyerOffer, completed, messages}
    */
    static async getTrade(tradeId) {
        const result = await db.query(`SELECT id, 
                                              seller_name AS "sellerName", 
                                              buyer_name AS "buyerName", 
                                              seller_offer AS "sellerOffer", 
                                              buyer_offer AS "buyerOffer", 
                                              completed
                                       FROM trades 
                                       WHERE id = $1`, [tradeId]);

        if (!result.rows[0]) throw new NotFoundError(`No trade with ID: ${tradeId}`);

        const { id, sellerName, buyerName, sellerOffer, buyerOffer, completed } = result.rows[0];

        const messages = await Messages.getAllMessages(tradeId);

        const trade = new Trades(id, sellerName, buyerName, sellerOffer, buyerOffer, completed, messages);

        return trade;
    };

    /* Get All of User's Seller/Buyer Offers
    make a query request to get all trades where the username matches the seller_name or buyer_name
    return the results [{id, sellerName, buyerName, sellerOffer, buyerOffer}, ...]
    */
    static async getAllUserTrades(username) {
        const result = await db.query(`SELECT id, 
                                              seller_name AS "sellerName", 
                                              buyer_name AS "buyerName", 
                                              seller_offer AS "sellerOffer", 
                                              buyer_offer AS "buyerOffer", 
                                              completed
                                       FROM trades 
                                       WHERE seller_name = $1 OR buyer_name = $1`, [username]);

        const trades = result.rows.map(trade => {
            const { id, sellerName, buyerName, sellerOffer, buyerOffer, completed } = trade;
            const newTrade = new Trades(id, sellerName, buyerName, sellerOffer, buyerOffer, completed);
            return newTrade;
        });

        return trades;
    };

    /* Accept Offer
    find the user id of the person who accepted offer
    make query to check that trade ID exists. if it doesn't exist, throw a NotFoundError
    if the user who accepts offer is not the buyer, throw BadRequestError

    call usersCards.makeTrade() method from UsersCards to swap the crads between two users.
    return true
    */
    async acceptOffer(username) {
        if (username !== this.buyerName) throw new BadRequestError(`This user made the offer: ${username}`);

        const tradedCards = await UsersCards.makeTrade(this.sellerName, this.buyerName, this.sellerOffer, this.buyerOffer);

        const markComplete = await db.query(`UPDATE trades
                                         SET completed = $1
                                         WHERE id = $2
                                         RETURNING completed`, [true, this.id]);
        const status = markComplete.rows[0]

        return { tradedCards, status };
    };

    /* Delete/Refuse Offer
    make a query to delete offer by ID
    if offer is not found, throw NotFoundError
    return trade the id
    */
    async deleteOffer() {
        const result = await db.query(`DELETE
                                       FROM trades
                                       WHERE id = $1
                                       RETURNING id`, [this.id]);

        return "deleted";
    };

};

module.exports = Trades;