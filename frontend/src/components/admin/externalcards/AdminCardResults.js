import React, { useState, useEffect } from "react";

import AdminCardRow from "./AdminCardRow";
import AdminApiCardColumn from "./AdminApiCardColumn";

import "../../../css/admin/admincardresults.css";

const AdminCardResults = ({ cards, addCard }) => {
    const [htmlCards, setHtmlCards] = useState([]);

    useEffect(() => {
        const htmlCardsArr = Array.from(cards).map(card => {
            return <AdminCardRow card={card} addCard={addCard} key={card.id} />
        })
        setHtmlCards(htmlCardsArr);
    }, [cards,addCard]);

    return <div className="AdminCardResults">
        <AdminApiCardColumn />
        {htmlCards}
    </div>
};

export default AdminCardResults;
