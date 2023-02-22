import React from "react";

import "../../../css/admin/adminapicardcolumn.css";

const AdminApiCardColumn = () => {

    return <div className="AdminApiCardColumn">
        <div className="AdminApiCardColumn-card">Card Image</div>
        <div className="AdminApiCardColumn-info">Card Name</div>
        <div className="AdminApiCardColumn-info">Price</div>
        <div className="AdminApiCardColumn-info">Rarity</div>
        <div className="AdminApiCardColumn-info">Set Name</div>
        <div className="AdminApiCardColumn-setlogo">Set Logo</div>
        <div className="AdminApiCardColumn-delete">Add</div>
    </div>
};

export default AdminApiCardColumn;