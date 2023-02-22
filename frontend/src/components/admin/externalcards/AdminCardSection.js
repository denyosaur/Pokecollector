import React, { useState, useEffect } from "react";

import CardsApi from "../../../api/cards-api";

import AdminCardResults from "./AdminCardResults";
import Loading from "../../navigation/Loading";

import "../../../css/admin/admincardsection.css";

const AdminCardResultsSection = ({ selectedSet, token }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState(new Set());

    useEffect(() => {
        async function getSetCards() {
            setIsLoading(true);
            const data = { "id": selectedSet }
            const res = await CardsApi.getCardsFromSet(data, token);
            setCards(new Set(res.cards));
            setIsLoading(false);
        };

        getSetCards();

    }, [selectedSet, token]);

    async function addCard(cardToAdd) {
        await CardsApi.createCard(cardToAdd, token); //create card in DB

        const updatedArr = [...cards].filter(card => card !== cardToAdd); //create new Array with card removed
        setCards(updatedArr);//update cards useState with new array
    }

    return <div className="AdminCardResultsSection">
        {isLoading
            ? <Loading />
            : <AdminCardResults cards={cards} addCard={addCard} />}
    </div>
};

export default AdminCardResultsSection;