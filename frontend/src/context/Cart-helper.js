export const ADD_CARD = "ADD_PRODUCT";
export const REMOVE_CARD = "REMOVE_PRODUCT";
export const CLEAR = "CLEAR";

/** Adding new card to card
 */
const addToCart = (card, state) => {
    if (!card.id) return
    const updatedCart = { ...state.cart }; //create a variable of cart that will be mutated
    const cardsInCart = Object.keys(state.cart); //get the keys of the cart in as an array
    if (cardsInCart.includes(card.id)) { //if cardsInCart has id
        let updatedCard = { ...updatedCart[card.id] }; //save the card from cart in variable
        updatedCard.quantity++; //increase the quantity of the card variable by one
        updatedCart[card.id] = updatedCard; //replace the card in updatedCart with new card(with increased quantity)
    } else { //if cardsInCart doesn't have ID,
        const cartInfo = { //create a variable with the card information and quantity 1
            quantity: 1,
            name: card.name,
            image: card.images,
            price: card.prices,
            setName: card.setName,
            rarity: card.rarity
        };
        updatedCart[card.id] = cartInfo; //create card new card object in updatedCart
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart)); //save the updated cart in localStorage
    return { ...state, cart: updatedCart }; //return the state, and cart with updatedCart
}

/** Removing card from cart
 */
const removeFromCart = (card, state) => {
    const updatedCart = { ...state.cart }; //create a variable of cart that will be mutated
    if (updatedCart[card.id].quantity > 1) {  //if the card quantity in updatedCart is greater than 1,
        let updatedCard = { ...updatedCart[card.id] }; //save the card from cart in variable
        updatedCard.quantity--; //decrease the quantity of the card variable by one
        updatedCart[card.id] = updatedCard; //replace the card in updatedCart with new card(with increased quantity)
    } else { //if cardsInCart quantity is 1, 
        delete updatedCart[card.id]; //delete the card.
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart)); //save the updated cart in localStorage
    return { ...state, cart: updatedCart }; //return the state, and cart with updatedCart
}

/** Clear cart
 * used after purchasing cart
 */
const clearCart = (state) => {
    return { ...state, cart: {} };
}

/** cart reducer
 * depending on action.type choice (ADD_CARD, REMOVE_CARD, or CLEAR), switch between the three functions
 */
export const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_CARD:
            return addToCart(action.card, state);
        case REMOVE_CARD:
            return removeFromCart(action.card, state);
        case CLEAR:
            return clearCart(state);
        default:
            return state;
    }
}
