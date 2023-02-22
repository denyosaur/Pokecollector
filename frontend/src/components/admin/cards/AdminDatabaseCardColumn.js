import React from "react";

import "../../../css/admin/admindatabasecardcolumn.css";

const AdminDatabaseCardColumn = () => {

    return <div className="AdminDatabaseCardColumn">
        <div className="AdminDatabaseCardColumn-card">Card Image</div>
        <div className="AdminDatabaseCardColumn-info">Card Name</div>
        <div className="AdminDatabaseCardColumn-info">Rarity</div>
        <div className="AdminDatabaseCardColumn-info">Set Name</div>
        <div className="AdminDatabaseCardColumn-setlogo">Set Logo</div>
        <div className="AdminDatabaseCardColumn-delete">Delete</div>
    </div>
};

export default AdminDatabaseCardColumn;