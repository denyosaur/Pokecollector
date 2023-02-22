import React from "react";

import "../../css/admin/adminbar.css";

const AdminBar = ({ setAdminPage }) => {
    const handleClick = (evt) => {
        setAdminPage(evt.target.innerText)
    };


    return <div className="AdminBar">
        <div><span className="AdminBar-header">Navigation</span></div>
        <div className="AdminBar-item" onClick={handleClick}>Users</div>
        <div className="AdminBar-item" onClick={handleClick}>Database Cards</div>
        <div className="AdminBar-item" onClick={handleClick}>External API Cards</div>
    </div>
};

export default AdminBar;