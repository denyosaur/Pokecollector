import React from "react";

import "../../../css/admin/admindatabasecardrow.css";

const AdminDatabaseCardRow = ({ card, handleDelete }) => {
    const { name, setName, setLogo, images, rarity } = card;

    return <div className="AdminDatabaseCardRow">
        <div className="AdminDatabaseCardRow-card"><img src={images} alt="set logo" /></div>
        <div className="AdminDatabaseCardRow-info">{name}</div>
        <div className="AdminDatabaseCardRow-info">{rarity}</div>
        <div className="AdminDatabaseCardRow-info">{setName}</div>
        <div className="AdminDatabaseCardRow-setlogo"><img src={setLogo} alt="set logo" /></div>
        <div className="AdminDatabaseCardRow-delete">
            <button onClick={() => { handleDelete(card) }}><i className="bi bi-trash"></i></button>
        </div>
    </div>
};

export default AdminDatabaseCardRow;