import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';

import AdminBar from "./AdminBar";
import AdminHome from "./AdminHome";
import AdminUsers from "./users/AdminUsers";
import AdminDatabaseCards from "./cards/AdminDatabaseCards";
import AdminApiCards from "./externalcards/AdminApiCards";

import UsersApi from "../../api/users-api";

import "../../css/admin/admin.css";

const Admin = () => {
    const [token, setToken] = useState("");
    const [adminPage, setAdminPage] = useState("AdminHome");
    const [isAdmin, setIsAdmin] = useState(true);
    const adminPages = {
        "AdminHome": (<div className="Admin-home">
            <AdminHome />
        </div>),
        "Users": (<div className="Admin-Users">
            <AdminUsers token={token} />
        </div>),
        "Database Cards": <div className="Admin-cards">
            <AdminDatabaseCards token={token} setAdminPage={setAdminPage} />
        </div>,
        "External API Cards": (<div className="Admin-externalcards">
            <AdminApiCards token={token} setAdminPage={setAdminPage} />
        </div>)
    };

    useEffect(() => {
        const username = localStorage.getItem("username") || false;
        const token = localStorage.getItem("token") || false;

        setToken(token);

        async function getAdminStatus() {
            const userInfo = await UsersApi.currUser(username, token);
            setIsAdmin(userInfo.user.isAdmin);
        }
        getAdminStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isAdmin ? (<div className="Admin">
        <div className="Admin-container">
            <div className="Admin-AdminBar">
                <AdminBar adminPage={adminPage} setAdminPage={setAdminPage} />
            </div>
            <div className="Admin-main">
                {adminPages[adminPage]}
            </div>
        </div>
    </div>)
        : <Redirect to="/" />
};

export default Admin;