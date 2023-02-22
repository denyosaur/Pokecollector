import React from "react";

import "../../css/decks/columncards.css";

const ColumnCard = ({ card, removeFromDeck }) => {
    const { id, images, name, setLogo, ownedId } = card;

    return (
        <div className="ColumnCard" >
            <div className="ColumnCard-image">
                <img src={images} alt={`${name} card`} data={id} />
            </div>
            <div className="ColumnCard-name">
                <span>{name}</span>
            </div>
            <div className="ColumnCard-setLogo">
                <img src={setLogo} alt={`${setLogo} card`} data={id} />
            </div>
            <div className="ColumnCard-close">
                <i className="bi bi-x-lg" onClick={() => removeFromDeck(ownedId, card)} ></i>
            </div>
        </div>
    )
};

export default ColumnCard;