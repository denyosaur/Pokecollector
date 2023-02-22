import request from "./api-request-helper";

class DeckApi {
    /******************LOGGED IN************************************/

    /*method for getting all decks a user created
    returns deck object {decks:[{id, username, deckName}, ...]}
    */
    static async getDecks(username, token) {
        if (token) {
            const res = await request(`decks/${username}`, token);

            return res;
        }
    }

    /*method for deck information and all cards associated
    returns deck object {deck: {id, username, deckName}, cards: [{id, name, images, setName, setLogo},...]}
    */
    static async getDeckInfo(username, token, deckId) {
        if (token) {
            const res = await request(`decks/${username}/${deckId}`, token);

            return res;
        }
    }

    /* POST method for creating new deck
    returns deck object {deck: {id, username, deckName}, cards: [{id, name, images, setName, setLogo},...]}
    */
    static async createDeck(username, token, data) {
        if (token) {
            const res = await request(`decks/${username}`, token, "POST", data);

            return res;
        }
    }

    /*method for updating deck name
    returns deck object {newDeckName: {id, username, deckName}}
    */
    static async updateDeckInfo(username, token, deckId, data) {
        if (token) {
            const res = await request(`decks/${username}/${deckId}`, token, "PATCH", data);

            return res;
        }
    }

    /*method for updating cards in a deck
    data needs to contain { updatedDeck: [ownedId1, ownedId2, ...] }
    returns deck object {updated:{
                                    removed: {deckId, cardId}, 
                                    added:{deckId, cardId}
                                }}
    */
    static async updateCardsInDeck(username, token, deckId, data) {
        if (token) {
            const res = await request(`decks/${username}/${deckId}/update`, token, "PATCH", data);

            return res;
        }
    }

    /* method for deleting a deck
    returns deck object {deleted: {id, username, deckName}}
    */
    static async deleteDeck(username, token, deckId) {
        const res = await request(`decks/${username}/${deckId}`, token, "DELETE");

        return res;
    }
};

export default DeckApi;