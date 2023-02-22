import React, { useEffect } from "react";

import MiniCard from "./MiniCard";

import "../../css/cards/cardslist.css";

const CardsList = ({ cards, moreInfo, fromShopPage }) => {
    const infoForMiniCards = cards.map((card, index) => {
        index++;
        return (
            <div key={`${card.id}-${index}`} className="StoreCards-card">
                <MiniCard card={card} moreInfo={moreInfo} fromShopPage={fromShopPage} />
            </div>);
    });

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards, fromShopPage])

    return <div className="CardsList">
        {cards[0] && infoForMiniCards}
    </div>
};

export default CardsList;