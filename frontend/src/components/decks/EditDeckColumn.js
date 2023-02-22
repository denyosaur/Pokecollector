import React from "react";

import ColumnCards from "./ColumnCards";

import "../../css/decks/editdeckcolumn.css";

const EditDeckColumn = ({ colCards, removeFromDeck }) => {

    return (
        <div className="EditDeckColumn" >
            {colCards.map(card => {
                return (<div className="" key={card.ownedId}>
                    <ColumnCards card={card} removeFromDeck={removeFromDeck} />
                </div>)
            })}
        </div>
    )
};

export default EditDeckColumn;