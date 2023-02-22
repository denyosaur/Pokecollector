import React, { useEffect, useState, useContext } from "react";

import CardsApi from "../../api/cards-api";
import CartContext from "../../context/CartContext";

import "../../css/cards/carddetails.css";

const CardDetails = ({ cardId, setCardId, handleCloseCardDetails }) => {
    const Cart = useContext(CartContext);
    const [card, setCard] = useState("");

    const closeDetails = () => {
        setCardId("");
    }

    function cartAdd() {
        //cart requires name, images, prices, id
        const toAdd = {
            id: cardId,
            name: card.name,
            images: card.images,
            prices: card.prices,
            setName: card.setName,
            rarity: card.rarity
        }
        Cart.addToCart(toAdd);
    }

    useEffect(() => {
        async function getCardDetails(id) {
            const details = await CardsApi.getCardInfo(id);
            details.card.resistances = JSON.parse(details.card.resistances);
            details.card.legalities = JSON.parse(details.card.legalities);
            details.card.weaknesses = JSON.parse(details.card.weaknesses);
            details.card.attacks = details.card.attacks.map(attack => {
                return JSON.parse(attack)
            });

            setCard(details.card);

        }
        getCardDetails(cardId);
    }, [cardId]);

    return (
        <>
            <div className="CardDetails">
                <div className="CardDetails-formClose">
                    <i className="bi bi-x-lg CardDetails-formClose" onClick={closeDetails} ></i>
                </div>
                <div className="CardDetails-details">
                    <div className="CardDetails-col1">
                        <img src={card.images} alt={`${card.name} card`} />
                    </div>
                    <div className="CardDetails-col2">
                        <ul className="CardDetails-info">
                            <li>
                                <label>Name</label>
                                <span>{card.name}</span>
                            </li>
                            <li>
                                <label>Pokemon #</label>
                                <span>{card.number}</span>
                            </li>
                            <li>
                                <label>Type</label>
                                <span>{card.types}</span>
                            </li>
                            <li>
                                <label>Set</label>
                                <span>{card.setName}</span>
                            </li>
                            <li>
                                <label>Rarity</label>
                                <span>{card.rarity}</span>
                            </li>
                            <li>
                                <label>Price</label>
                                <span>${card.prices}</span>
                            </li>
                            <li>
                                <label>Artist</label>
                                <span>{card.artist}</span>
                            </li>

                        </ul>
                        <div className="CardDetails-setimage">
                            <img src={card.setLogo} alt={`${card.setName} card`} />
                        </div>
                        <div className="CardDetails-cart">
                            <button onClick={cartAdd}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="CardDetails-background" onClick={handleCloseCardDetails}></div>
        </>
    )
}

export default CardDetails;