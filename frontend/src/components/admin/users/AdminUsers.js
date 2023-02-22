import React, { useState, useEffect } from "react";

import UsersApi from "../../../api/users-api";

import AdminNewUser from "./AdminNewUser";
import AdminUserList from "./AdminUserList";
import AdminUserColumns from "./AdminUserColumns";

import "../../../css/admin/adminusers.css";

const AdminUsers = ({ token }) => {
    const [users, setUsers] = useState(new Set()); //useState to hold the list of all users
    const [reload, setReload] = useState(false); //used to reload the admin page

    useEffect(() => {
        async function getUsers() {
            const allUsers = await UsersApi.getAllUsers(token);
            setUsers(new Set(allUsers.users));
        }
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, reload]);

    function handleDelete(usernameToDelete) {
        async function deleteUser() {
            await UsersApi.deleteUser(usernameToDelete, token);
        }
        deleteUser();
        setReload(!reload);
    };

    function handleCreate(data) {
        data.isAdmin = data.isAdmin === "true";
        async function createAdmin() {
            await UsersApi.createAdmin(data, token);
        }
        createAdmin();
        setReload(!reload);
    };

    return <div className="AdminUsers">
        <AdminUserColumns />
        <AdminNewUser handleCreate={handleCreate} />
        <AdminUserList users={users} handleDelete={handleDelete} />
    </div>
};

export default AdminUsers;