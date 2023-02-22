import React, { useEffect, useState } from "react";

import AdminDatabaseCardRow from "./AdminDatabaseCardRow";

const AdminDatabaseCardList = ({ cards, handleDelete }) => {
    const [listOfCards, setListOfCards] = useState([]);

    useEffect(() => {
        setListOfCards([]);
        const cardInfo = Array.from(cards);

        setListOfCards(cardInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards])

    return <div className="AdminDatabaseCardList">
        {listOfCards.map(card => {
            return (<div className="AdminUserList-row" key={card.id}>
                <AdminDatabaseCardRow card={card} handleDelete={handleDelete} />
            </div>)
        })}
    </div>
};

export default AdminDatabaseCardList;