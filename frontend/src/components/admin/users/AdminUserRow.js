import React from "react";

import "../../../css/admin/AdminUserRow.css";

const AdminUserRow = ({ user, handleDelete }) => {
    const { currencyAmount, email, firstName, isAdmin, lastName, username } = user;

    return <div className="AdminUserRow">
        <div className="AdminUserRow-info">{username}</div>
        <div className="AdminUserRow-info">{firstName}</div>
        <div className="AdminUserRow-info">{lastName}</div>
        <div className="AdminUserRow-info">{email}</div>
        <div className="AdminUserRow-info">{`$${currencyAmount}`}</div>
        <div className="AdminUserRow-info">{`${isAdmin}`}</div>
        <div className="AdminUserRow-delete">
            <button onClick={() => { handleDelete(username) }}><i className="bi bi-trash"></i></button>
        </div>
    </div>
};

export default AdminUserRow;