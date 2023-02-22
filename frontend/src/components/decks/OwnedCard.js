import React from "react";

import "../../css/decks/deckcard.css";

const OwnedCard = ({ card, addToDeck, toUpdate }) => {
    const cardInDeckAlready = toUpdate.has(card.ownedId);
    const classNameSwitch = cardInDeckAlready ? "DeckCard-image-inactive" : "DeckCard-image-active"

    const columnCardInfo = {
        id: card.cardInfo.id,
        images: card.cardInfo.images,
        name: card.cardInfo.name,
        setLogo: card.cardInfo.setLogo,
        setName: card.cardInfo.setName,
        ownedId: card.ownedId
    };

    return (
        <div className="DeckCard" onClick={() => addToDeck(card.ownedId, columnCardInfo)}>
            <div className={classNameSwitch}>
                <img src={card.cardInfo.images} alt={`${card.cardInfo.name} card`} />
            </div>
        </div>
    )
};

export default OwnedCard;