"use strict";

const db = require("../db");

/* Functions for Messages */

class Messages {
    constructor(id, tradeId, username, message, timestamp) {
        this.id = id;
        this.tradeId = tradeId;
        this.username = username;
        this.message = message;
        this.timestamp = timestamp;
    };

    /*Create New Message
    create a variable to hold the current time
    make a query to get username's ID
    make db request to INSERT a new message row
    return newMessage object {tradeId, userId, message, timestamp}
    */
    static async createMessage(newTradeId, uname, newMessage) {
        const currTime = new Date();

        const createMessage = await db.query(`INSERT INTO messages
                                              (trade_id, username, message, timestamp)
                                              VALUES ($1, $2, $3, $4)
                                              RETURNING id,
                                                        trade_id AS "tradeId",
                                                        username,
                                                        message,
                                                        timestamp`,
            [newTradeId, uname, newMessage, currTime]);

        const { id, tradeId, username, message, timestamp } = createMessage.rows[0];

        return new Messages(id, tradeId, username, message, timestamp);
    };

    /*Get All Messages by Trade ID
    check that the trade ID exists, if not, throw NotFoundError

    select all messages where trade_id that matches the passed in ID
    return result [{tradeId, fromUserId, toUsername, message, timestamp}, ...]
    */
    static async getAllMessages(tradeId) {
        const result = await db.query(`SELECT id,
                                              trade_id AS "tradeId", 
                                              username, 
                                              message, 
                                              timestamp
                                       FROM messages
                                       WHERE trade_id = $1`, [tradeId]);

        const messages = result.rows.map(msg => {
            const { id, tradeId, username, message, timestamp } = msg;
            return new Messages(id, tradeId, username, message, timestamp);
        })

        return messages;
    };

    /*Get a Message
    get message information by message ID
    return message object {id, tradeId, userId, message, timestamp}
   */
    static async getMessage(msgId) {
        const result = await db.query(`SELECT id,
                                              trade_id AS "tradeId", 
                                              username, 
                                              message, 
                                              timestamp
                                       FROM messages
                                       WHERE id = $1`, [msgId]);
        const { id, tradeId, username, message, timestamp } = result.rows[0];

        return new Messages(id, tradeId, username, message, timestamp);
    };

    /*Edit Message
    newMsg should be text
    make an update request to change the message and timestamp of the message
    return new Messages object {id, tradeId, userId, message, timestamp}
    */
    async editMessage(newMsg) {
        const currTime = new Date();
        const result = await db.query(`UPDATE messages
                                       SET message = $1, timestamp = $2
                                       WHERE id = $3
                                       RETURNING id,
                                                 trade_id AS "tradeId", 
                                                 username, 
                                                 message, 
                                                 timestamp`, [newMsg, currTime, this.id]);
        const { id, tradeId, username, message, timestamp } = result.rows[0];

        return new Messages(id, tradeId, username, message, timestamp);
    };

    /*Create New Message
    make a DELETE query to delete row with messageId as ID
    return message id
    */
    async deleteMessage() {
        const result = await db.query(`DELETE 
                                       FROM messages
                                       WHERE id = $1
                                       RETURNING id`, [this.id]);
        const message = result.rows[0];

        return message;
    };
}

module.exports = Messages;
