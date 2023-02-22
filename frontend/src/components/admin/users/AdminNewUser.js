import React from "react";

import useFields from "../../../hooks/useFields";

import "../../../css/admin/adminnewuser.css";

const AdminNewUser = ({ handleCreate }) => {
    const INITIAL_STATE = {
        username: "",
        password: "passwordChange",
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: "false"
    }
    const [formData, setFormData] = useFields(INITIAL_STATE);

    return <div className="AdminNewUser">
        <form onSubmit={() => handleCreate(formData)}>
            <div className="AdminNewUser-input">
                <label htmlFor="username"></label>
                <input type="text" placeholder="Username" name="username" id="username" onChange={setFormData}></input>
            </div>

            <div className="AdminNewUser-input">
                <label htmlFor="firstName"></label>
                <input type="text" placeholder="First Name" name="firstName" id="firstName" onChange={setFormData}></input>
            </div>

            <div className="AdminNewUser-input">
                <label htmlFor="lastName"></label>
                <input type="text" placeholder="Last Name" name="lastName" id="lastName" onChange={setFormData}></input>
            </div>

            <div className="AdminNewUser-input">
                <label htmlFor="email"></label>
                <input type="email" placeholder="Email" name="email" id="email" onChange={setFormData}></input>
            </div>

            <div className="AdminNewUser-input">
                <label htmlFor="currency"></label>
                <input type="text" placeholder="currency" name="currency" id="currency" disabled></input>
            </div>

            <div className="AdminNewUser-input">
                <label htmlFor="isAdmin"></label>
                <select name="isAdmin" id="isAdmin" onChange={setFormData} value={formData.isAdmin}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
            </div>

            <div className="AdminNewUser-submit">
                <button ><i className="bi bi-person-plus"></i></button>
            </div>
        </form>
    </div>
};

export default AdminNewUser;