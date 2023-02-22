import React from "react";

import "../../../css/admin/adminusercolumns.css";

const AdminUserColumns = () => {

    return <div className="AdminUserColumns">
        <div className="AdminUserColumns-info">Username</div>
        <div className="AdminUserColumns-info">First Name</div>
        <div className="AdminUserColumns-info">Last Name</div>
        <div className="AdminUserColumns-info">Email</div>
        <div className="AdminUserColumns-info">Currency Amount</div>
        <div className="AdminUserColumns-info">Admin</div>
        <div className="AdminUserColumns-delete">Delete</div>
    </div>
};

export default AdminUserColumns;