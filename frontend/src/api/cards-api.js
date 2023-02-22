import request from "./api-request-helper";

class CardsApi {
    /******************NO RESTRICTION************************************/

    /*method for getting all cards or searching cards with queries
    available for data {query: {
                            name, 
                            minPrice, 
                            maxPrice, 
                            rarity, 
                            types, 
                            setName
                        }}
    returns [{card},...] 
    */
    static async getCards(data = {}, token = "") {

        const res = await request("cards/", token, "GET", data);

        return res;
    };

    /*method for getting info on a specific card by ID
    returns card object {card} with information
    */
    static async getCardInfo(cardId) {
        const res = await request(`cards/${cardId}`);

        return res;
    };

    /*method for getting all set names in database
    returns setNames object with setNames
    */
    static async getSetNames() {
        const res = await request(`cards/sets/getsetnames`);

        return res;
    };

    /******************LOGGED IN************************************/

    /*method for getting all cards a user owns
    returns cards object { cards: [{ownedId, username, cardId, cardInfo},...] }
    */
    static async getOwnedCards(username, token) {
        const res = await request(`cards/user/${username}`, token);

        return res;
    };

    /*method for searching cards that a user owns
    returns cards object { cards: [{ownedId, username, cardId, cardInfo},...] }
    */
    static async searchOwnedCards(data, token, username) {
        const res = await request(`cards/user/${username}/search`, token, "GET", data);

        return res;
    };

    /******************ADMIN ONLY************************************/

    /*method for pulling card data from external API And uploading to pokecollector db
    returns newCards object {newCards:[{card},...]}
    */
    static async createCardsBySet(setId) {
        const res = await request(`cards/pullCards/${setId}`, "POST");

        return res;
    };

    /*method for getting set information from external API
    returns {set}
    */
    static async getSets(token) {
        const res = await request(`cards/external/getsets`, token);

        return res;
    };

    /*method for getting set information from external API
    returns {set}
    */
    static async getCardsFromSet(data, token) {
        const res = await request(`cards/external/getcards/${data.id}`, token, "GET");

        return res;
    };

    /*method for creating a single card from external API
    returns newCards object {newCards:[{card},...]}
    */
    static async createCard(data, token) {
        const res = await request(`cards/createcard`, token, "POST", data);

        return res;
    };

    /*method for deleting a card by id
    returns newCards object {newCards:[{card},...]}
    */
    static async deleteCard(cardId, token) {
        const res = await request(`cards/delete/${cardId}`, token, "DELETE");

        return res;
    };
};


export default CardsApi;