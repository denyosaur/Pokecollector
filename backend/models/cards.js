"use strict";

const db = require("../db");
const axios = require("axios");

const { NotFoundError, BadRequestError } = require("../expressErrors");

/* Model for cards in the DB. Holds related functions.*/

class Cards {
    constructor(id, name, supertype, subtypes, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices) {
        this.id = id;
        this.name = name;
        this.supertype = supertype;
        this.subtypes = subtypes;
        this.hp = hp;
        this.types = types;
        this.evolvesTo = evolvesTo;
        this.rules = rules;
        this.attacks = attacks;
        this.weaknesses = weaknesses;
        this.resistances = resistances;
        this.retreatCost = retreatCost;
        this.convertedRetreatCost = convertedRetreatCost;
        this.setName = setName;
        this.setLogo = setLogo;
        this.number = number;
        this.artist = artist;
        this.rarity = rarity;
        this.nationalPokedexNumbers = nationalPokedexNumbers;
        this.legalities = legalities;
        this.images = images;
        this.tcgplayer = tcgplayer;
        this.prices = prices
    };

    /*Pokemon API call to get all cards from a set and push to DB
    make API call using axios.get to get all cards from a set
    use this.create to create cards. 
    return array of Cards object
    */
    static async pullAndPushCards(setName) {
        const url = `https://api.pokemontcg.io/v2/cards?q=set.id%3A${setName}`;

        const result = await axios.get(url);

        const cards = await Promise.all(result.data.data.map(async (card) => {
            const newCard = {
                "id": card.id,
                "name": card.name,
                "superType": card.supertype,
                "subtype": card.subtype,
                "hp": card.hp,
                "types": card.types,
                "evolvesTo": card.evolvesTo,
                "rules": card.rules,
                "attacks": card.attacks,
                "weaknesses": card.weaknesses,
                "resistances": card.resistances,
                "retreatCost": card.retreatCost,
                "convertedRetreatCost": card.convertedRetreatCost,
                "setName": card.set.name,
                "setLogo": card.set.images.logo,
                "number": card.number,
                "artist": card.artist,
                "rarity": card.rarity,
                "nationalPokedexNumbers": card.nationalPokedexNumbers,
                "legalities": card.legalities,
                "images": card.images.large,
                "tcgplayer": card.tcgplayer,
                "prices": card.cardmarket.prices.averageSellPrice
            };
            const uploadedCard = await this.create(newCard);
            return uploadedCard;
        }));

        return cards;
    };

    /*Get all sets and set information from external API
    get set info and put into new Set()
    return new {set: {setId, setName},...}
    */
    static async getSets() {
        const res = await axios.get(`https://api.pokemontcg.io/v2/sets/`);
        const resData = res.data.data;
        const sets = [];

        resData.forEach(set => {
            const setInfo = { setId: set.id, setName: set.name };
            sets.push(setInfo);
        })

        return sets;
    };

    /*Get all sets and set information from external API
    get set info and put into new Set()
    return new {set: {setId, setName},...}
    */
    static async getCardsFromSet(setId) {
        const res = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id%3A${setId}`);
        const resCards = res.data.data;

        const cards = resCards.map(card => {
            const newCard = {
                "id": card.id,
                "name": card.name,
                "superType": card.supertype,
                "subtype": card.subtype,
                "hp": card.hp,
                "types": card.types,
                "evolvesTo": card.evolvesTo,
                "rules": card.rules,
                "attacks": card.attacks,
                "weaknesses": card.weaknesses,
                "resistances": card.resistances,
                "retreatCost": card.retreatCost,
                "convertedRetreatCost": card.convertedRetreatCost,
                "setName": card.set.name,
                "setLogo": card.set.images.logo,
                "number": card.number,
                "artist": card.artist,
                "rarity": card.rarity,
                "nationalPokedexNumbers": card.nationalPokedexNumbers,
                "legalities": card.legalities,
                "images": card.images.large,
                "tcgplayer": card.tcgplayer,
                "prices": card.cardmarket.prices.averageSellPrice
            };
            return new Cards(
                card.id,
                card.name,
                card.supertype,
                card.subtype,
                card.hp,
                card.types,
                card.evolvesTo,
                card.rules,
                card.attacks,
                card.weaknesses,
                card.resistances,
                card.retreatCost,
                card.convertedRetreatCost,
                card.set.name,
                card.set.images.logo,
                card.number,
                card.artist,
                card.rarity,
                card.nationalPokedexNumbers,
                card.legalities,
                card.images.large,
                card.tcgplayer,
                card.cardmarket.prices.averageSellPrice);
        });

        return cards;
    };


    /*Create a new card in the card_library table.
        check if the card exists by searching for the card_id. card_id is taken from the IDs given by the API.
        if ID exists, return BadRequestError for duplicate.
        if card doesn't exist, create a new entry for card in card_library
    */
    static async create({ id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices }) {
        const duplicateCheck = await db.query(`SELECT id AS "cardId"
                                               FROM cards
                                               WHERE id = $1`, [id]);
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate entry for: ${id}, ${name} `);

        const res = await db.query(`
        INSERT INTO cards
        (id, name, supertype, subtypes, hp, types, evolves_to, rules, attacks, weaknesses, resistances, retreat_cost, converted_retreat_cost, set_name, set_logo, number, artist, rarity, national_pokedex_numbers, legalities, images, tcgplayer, prices)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
            [id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, +prices]);

        return new Cards(id, name, superType, subtype, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices);
    };



    /*method to find all the cards. can use search filters to filter out results
    query variable holds the base SQL query. whereExpressions will hold the sql query strings for search filters. Where statements hold the syntax for db.query.
    queryValues holds the actual values that will be put in with the db.query
    */
    static async findAll({ name, minPrice, maxPrice, rarity, types, setName } = {}) {
        let query = `SELECT id,
                            name,
                            supertype,
                            subtypes,
                            hp,
                            types,
                            evolves_to AS "evolvesTo",
                            rules,
                            attacks,
                            weaknesses,
                            resistances,
                            retreat_cost AS "retreatCost",
                            converted_retreat_cost AS "convertedRetreatCost",
                            set_name AS "setName",
                            set_logo AS "setLogo",
                            number,
                            artist,
                            rarity,
                            national_pokedex_numbers AS "nationalPokedexNumbers",
                            legalities,
                            images,
                            tcgplayer,
                            prices
                     FROM cards`;
        let whereExpressions = []; //array to hold the parts of the WHERE constraints
        let queryValues = []; //array to hold the values used to replace

        //name, minPrice, maxPrice, rarity, types, setName are all the possible saerch terms.
        //for each search query, create and push into where expressions the SQL syntax.
        if (name) { //name query
            queryValues.push(`%${name}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length} `);
        }
        if (minPrice !== undefined) {//minimum price query
            queryValues.push(minPrice);
            whereExpressions.push(`prices >= $${queryValues.length} `);
        };
        if (maxPrice !== undefined) {//maximum price query
            queryValues.push(maxPrice);
            whereExpressions.push(`prices <= $${queryValues.length} `);
        };
        if (rarity !== undefined) {//rarity query
            queryValues.push(rarity);
            whereExpressions.push(`rarity ILIKE $${queryValues.length} `);
        };
        if (types !== undefined) {//types query, searches through array in SQL
            queryValues.push(types);
            whereExpressions.push(`$${queryValues.length}=ANY(types)`);
        };
        if (setName !== undefined) {//set name query
            queryValues.push(setName);
            whereExpressions.push(`set_name = $${queryValues.length} `);
        };

        //Create Where statement by combining all search queries from above
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ")
        }

        //finalize query by adding ORDER BY name by default
        query += " ORDER BY name";

        const cardResponse = await db.query(query, queryValues);

        const cards = cardResponse.rows.map(card => {
            const { id, name, supertype, subtypes, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices } = card;
            return new Cards(id, name, supertype, subtypes, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices);
        });

        return cards;
    };

    /*Get All Information on a Single Card 
        query variable holds the base SQL query.
        returns all information about card
    */
    static async getCardInfo(cardId) {
        const result = await db.query(`SELECT id,
                                           name,
                                           supertype,
                                           subtypes,
                                           hp,
                                           types,
                                           evolves_to AS "evolvesTo",
                                           rules,
                                           attacks,
                                           weaknesses,
                                           resistances,
                                           retreat_cost AS "retreatCost",
                                           converted_retreat_cost AS "convertedRetreatCost",
                                           set_name AS "setName",
                                           set_logo AS "setLogo",
                                           number,
                                           artist,
                                           rarity,
                                           national_pokedex_numbers AS "nationalPokedexNumbers",
                                           legalities,
                                           images,
                                           tcgplayer,
                                           prices
                                   FROM cards
                                   WHERE id = $1`, [cardId]);
        if (!result) throw new NotFoundError(`No card with ID: ${cardId} `);

        const { id, name, supertype, subtypes, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices } = result.rows[0];
        return new Cards(id, name, supertype, subtypes, hp, types, evolvesTo, rules, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, setName, setLogo, number, artist, rarity, nationalPokedexNumbers, legalities, images, tcgplayer, prices);
    };

    /*Get All sets currently in database
            query variable holds the base SQL query.
            returns all information about card
        */
    static async getCurrentSets() {

        const result = await db.query(`SELECT set_name as "setName", COUNT(*)
                                       FROM cards
                                       GROUP BY set_name`);

        return result;
    };


    /*Delete a card in the card table.
    make a delete query where id = cardId
    if query is null, throw NotFoundError
    return card ID
    */
    async delete() {
        const result = await db.query(`DELETE
                                       FROM cards
                                       WHERE id = $1
                                       RETURNING id`, [this.id]);

        const card = result.rows[0];

        return card;
    }

    // /*
    // Card Pack Open Method

    // */
    // static async openCardPack(setName) {
    //     //get all cards for the specific set
    //     let query = await db.query(`SELECT * FROM cards WHERE set_name = $1`, [setName]);
    //     let cardSet = query.rows;

    //     return cardSet;
    // };



}

module.exports = Cards;