import React from "react";

import "../../css/cart/cartitem.css";

const CartItem = ({ card, id, cartRemove, cartAdd }) => {
    const { image, name, setName, rarity, quantity, price } = card;

    return (
        <div className="CartItem">
            <div className="CartItem-image">
                <img src={image} alt={`${name} card`} />
            </div>
            <div className="CartItem-info">
                <div className="CartItem-setName">{setName}</div>
                <div className="CartItem-name">{name}</div>
                <div className="CartItem-rarity">{rarity}</div>
                <div className="CartItem-quantity">
                    <button className="CartItem-remove" onClick={() => cartRemove(id)}><i className="bi bi-caret-left-fill"></i></button>
                    <input disabled="disabled" type="number" placeholder={quantity} name="quantity" id="quantity"></input>
                    <button className="CartItem-add" onClick={() => cartAdd(id)}><i className="bi bi-caret-right-fill"></i></button>
                </div>
            </div>
            <div className="CartItem-price">
                <span>${price * quantity}</span>
            </div>
        </div>
    )
};

export default CartItem;