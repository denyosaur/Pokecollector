import request from "./api-request-helper";

class StoreApi {
    /******************LOGGED IN************************************/

    /*method for adding cards in cart to store
    data - {"cart":[cardId, cardId, ...]}
    returns newCards object {newCards:[{id, cardId, username, cardName, setNAme, setLogo, images, prices}, ...]}
    */
    static async purchase(username, data, token) {
        if (token) {
            const res = await request(`store/${username}/purchase`, token, "POST", { cart: data });

            return res;
        }
    }

    /*method for adding additional funds
    data - {funds}
    returns updatedAmount object {updatedAmount: {username, currencyAmount}}
    */
    static async addFunds(username, token, data) {
        if (token) {
            console.log(data)
            const res = await request(`store/${username}/addFunds`, token, "PATCH", data);

            return res;
        }
    }

    /*method for updating deck name
    returns deck object {newDeckName: {id, username, deckName}}
    */
    static async removeFunds(username, data, token) {
        if (token) {
            const res = await request(`store/${username}/removeFunds`, token, "PATCH", data);

            return res;
        }
    }
};

export default StoreApi;