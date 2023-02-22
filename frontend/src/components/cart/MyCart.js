import React, { useState, useContext, useEffect } from "react";

import StoreApi from "../../api/store-api";

import CartContext from "../../context/CartContext";

import CartList from "./CartList";

import "../../css/cart/mycart.css";

const MyCart = ({ setCartOpen, authed, setOpenLogin, username, cartOpenHandler, cartOpen }) => {
    const INITIAL_VALUE = { price: 0, quantity: 0 }
    const { purchase, removeFunds } = StoreApi;
    const { cart, clearCart } = useContext(CartContext);
    const [totals, setTotals] = useState(INITIAL_VALUE);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        let newTotals = {
            price: 0,
            quantity: 0
        };
        for (let id in cart) {
            newTotals.quantity += cart[id].quantity;
            newTotals.price += (cart[id].price * cart[id].quantity);
        };

        setTotals(newTotals);
        setCartItems(cart);

        if (cartOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
        }
        return () => {
            document.body.style = ''
        };
    }, [cart, cartOpen]);

    const closeCart = () => { setCartOpen(false); }; //handler for closing cart window

    /*handler for checking out
    API request to:
        1. remove cost of cards
        2. add cards to user's inventory
    then remove "cart" from localStorage and restore the cart totals
    */
    const checkout = () => {
        let cost = { "funds": totals.price };
        async function makePurchase() {
            await removeFunds(username, cost, authed);
            await purchase(username, cart, authed);
            clearCart();
            setTotals(INITIAL_VALUE);
            setCartOpen(false);
        }
        makePurchase();
        localStorage.removeItem("cart");
    };

    return (
        <>
            <div className="MyCart">
                <div className="MyCart-header">
                    <div className="MyCart-title">My Cart</div>
                    <div className="MyCart-close"><i className="bi bi-x-lg Login-formClose" onClick={closeCart} ></i></div>
                </div>
                <div className="MyCart-items">
                    <CartList cartItems={cartItems} />
                </div>
                <div className="MyCart-Checkout">
                    <div className="MyCart-total">
                        <span>Total: ${totals.price}</span>
                    </div>
                    {authed
                        ? <button className="MyCart-Checkout-button" onClick={checkout}>Checkout[{totals.quantity}]</button>
                        : <button className="MyCart-Checkout-button" onClick={() => setOpenLogin("Login")}>Checkout[{totals.quantity}]</button>}
                </div>
            </div>
            <div className="MyCart-background" onClick={cartOpenHandler}></div>
        </>
    )
}

export default MyCart;