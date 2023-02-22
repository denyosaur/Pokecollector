import React, { useEffect, useState } from "react";

import CardsApi from "../../../api/cards-api";

import AdminDatabaseCardList from "./AdminDatabaseCardList";
import AdminDatabaseCardColumn from "./AdminDatabaseCardColumn";

const AdminDatabaseCards = ({ token, setAdminPage }) => {
    const [cards, setCards] = useState(new Set()); //useState to hold the list of all users

    useEffect(() => {
        async function getCards() {
            const allCards = await CardsApi.getCards({}, token);
            setCards(new Set(allCards.cards));
        }
        getCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    function handleDelete(card) {
        async function deleteCard() {
            await CardsApi.deleteCard(card.id, token);
        }
        deleteCard();
        setAdminPage("AdminHome");
    };

    return <div className="DatabaseCards">
        <AdminDatabaseCardColumn />
        <AdminDatabaseCardList cards={cards} handleDelete={handleDelete} />
    </div>
};

export default AdminDatabaseCards;