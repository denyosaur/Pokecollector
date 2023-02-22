import React from "react";

import "../../../css/admin/admincardrow.css";

const AdminCardRow = ({ card, addCard }) => {
    const { images, name, rarity, setName, setLogo, prices } = card;

    return <div className="AdminCardRow">
        <div className="AdminCardRow-card"><img src={images} alt="set logo" /></div>
        <div className="AdminCardRow-info">{name}</div>
        <div className="AdminCardRow-info">{`$${prices}`}</div>
        <div className="AdminCardRow-info">{rarity}</div>
        <div className="AdminCardRow-info">{setName}</div>
        <div className="AdminCardRow-setlogo"><img src={setLogo} alt="set logo" /></div>
        <div className="AdminCardRow-add">
            <button onClick={() => { addCard(card) }}><i className="bi bi-file-plus"></i></button>
        </div>
    </div>
};

export default AdminCardRow;