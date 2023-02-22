import React, { useState, useEffect } from "react";

import AdminUserRow from "./AdminUserRow";

import "../../../css/admin/adminuserlist.css";

const AdminUserList = ({ users, handleDelete }) => {
    const [listOfUsers, setListOfUsers] = useState([]);
    useEffect(() => {
        const userInfo = Array.from(users);
        const userList = userInfo.map(user => {
            return (<div className="AdminUserList-row" key={user.username}>
                <AdminUserRow user={user} handleDelete={handleDelete} />
            </div>);
        });
        setListOfUsers(userList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    return <div className="AdminUserList">
        {listOfUsers}
    </div>
};

export default AdminUserList;