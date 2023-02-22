import React, { useEffect, useState } from "react";

import CardsApi from "../../../api/cards-api";

import AdminSetsColumn from "./AdminSetsColumn";
import AdminCardSection from "./AdminCardSection";
import Loading from "../../navigation/Loading";

import "../../../css/admin/adminapicards.css";

const AdminApiCards = ({ token }) => {
    const [cardSets, setCardSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getCards() {
            setIsLoading(true);
            const res = await CardsApi.getSets(token);
            setCardSets(res.sets);
            setIsLoading(false);
        };
        getCards();
    }, [token]);

    return <div className="AdminApiCards">
        {!isLoading
            ? (<AdminSetsColumn cardSets={cardSets} setSelectedSet={setSelectedSet} />)
            : <Loading />}
        {selectedSet && <AdminCardSection selectedSet={selectedSet} token={token} />}

    </div>
};

export default AdminApiCards;