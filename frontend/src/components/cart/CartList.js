import React, { useEffect, useContext } from "react";

import CartContext from "../../context/CartContext";
import CartItem from "./CartItem";

import "../../css/cart/cartitem.css";

const CartList = ({ cartItems }) => {
    const Cart = useContext(CartContext);

    const cartRemove = (id) => {
        const toRemove = {
            id: id,
            name: cartItems[id].name,
            images: cartItems[id].image,
            prices: cartItems[id].price,
            setName: cartItems[id].setName,
            rarity: cartItems[id].rarity
        };
        Cart.removeFromCart(toRemove);
    };

    function cartAdd(id) {
        const toAdd = {
            id: id,
            name: cartItems[id].name,
            images: cartItems[id].image,
            prices: cartItems[id].price,
            setName: cartItems[id].setName,
            rarity: cartItems[id].rarity
        };
        Cart.addToCart(toAdd);
    };

    useEffect(() => {

    }, [cartItems]);

    return (
        <div className="CartList">
            {Object.keys(cartItems).map(id => { return <CartItem card={cartItems[id]} id={id} key={id} cartRemove={cartRemove} cartAdd={cartAdd} /> })}
        </div>
    )
}

export default CartList;