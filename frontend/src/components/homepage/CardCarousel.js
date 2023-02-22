import React, { useState, useEffect } from "react";

import MiniCard from "../Cards/MiniCard";
import Loading from "../navigation/Loading";

import "../../css/homepage/cardcarousel.css";

const CardCarousel = ({ cards, moreInfo, currentCardIndicesToShow }) => {
    const [cardsInCarousel, setCardsInCarousel] = useState([]);

    useEffect(() => {
        setCardsInCarousel(cards);

    }, [currentCardIndicesToShow, cards]);

    return <div className="CardCarousel">
        {cards.length===0 && <div className="CardCarousel-loading">
                <Loading/>
            </div>}
        {cardsInCarousel.slice(currentCardIndicesToShow[0], currentCardIndicesToShow[1]).map(card => {
            return (
                <div key={card.id} className="CardCarousel-card">
                    <MiniCard card={card} moreInfo={moreInfo} fromShopPage={true} />
                </div>)
        })}
    </div>
};

export default CardCarousel;