import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UsersApi from "../../api/users-api";
import NotificationCard from "../navigation/NotificationCard";
import AddFunds from "./AddFunds";

import "../../css/users/userprofile.css";

const UserProfile = () => {
    const history = useHistory();

    let token = localStorage.getItem("token") || false;
    let currUsername = localStorage.getItem("username") || false;

    const INITIAL_VALUE = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        secondPw: "",
        username: "",
        currPassword: ""
    };
    const PLACEHOLDER_PROFILE = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        secondPw: "",
        currPassword: "",
        username: ""
    };

    const [form, setForm] = useState(INITIAL_VALUE);
    const [useProfile, setUserProfile] = useState(PLACEHOLDER_PROFILE);
    const [openAddFunds, setOpenAddFunds] = useState(false);
    const [updatedCurrency, setUpdatedCurrency] = useState("");
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        /** function to get profile of currently logged in user.
         *  set form useState to the data received
         * component rerenders when funds is updated
         */
        async function getProfile() {
            const profileRes = await UsersApi.currUser(currUsername, token);
            const { firstName, lastName, email, currencyAmount, username } = profileRes.user;
            setUserProfile({
                firstName: firstName,
                lastName: lastName,
                currencyAmount: currencyAmount,
                email: email,
                username: username
            })
        };
        getProfile();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedCurrency]);

    /** function to handle change of form inputs
     * updates the form useState
     */
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm({ ...form, [name]: value });
    };

    /** function to handle submit of updated form inputs
     * delete currencyAmount and secondPw from form object. Back end doesn't make use of these two values
     * use API call to patch any updates
     * create notification bar to notify success or failure
     */
    const handleSubmit = async (evt) => {
        evt.preventDefault(); //stop page from reloading
        try {
            const updatedForm = form;
            delete updatedForm.secondPw;

            const dataToUpdate = {};
            for (let key in updatedForm) {
                if (updatedForm[key].length > 2) {
                    dataToUpdate[key] = updatedForm[key]
                }
            };

            await UsersApi.patchUserDetails(currUsername, dataToUpdate, token);

            const successMsg = {
                message: { message: "Successfully saved profile changes!" },
                status: "success"
            }

            setNotification(successMsg);

            setTimeout(() => {
                history.push("/"); //push profile to history 
            }, 1000);
        }
        catch (error) {
            const errorMsg = {
                message: { message: error[0] },
                status: "error"
            }
            setNotification(errorMsg);
        }
    };

    const addFundsButton = () => {
        setOpenAddFunds(!openAddFunds);
    };

    const newPasswordCheck = form.secondPw === form.password;

    return (
        <div className="Profile">
            <h3 className="Profile-header">User Profile Page</h3>

            {notification && <NotificationCard notification={notification} setNotification={setNotification} />}
            {openAddFunds && <div className="Profile-addFundsPopup"><AddFunds token={token} username={currUsername} setOpenAddFunds={setOpenAddFunds} setUpdatedCurrency={setUpdatedCurrency} /></div>}
            <form onSubmit={handleSubmit}>
                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="Profile-col-75">
                        <input disabled="disabled" type="text" placeholder={useProfile.username} name="username" id="username"  ></input>
                    </div>
                </div>

                <div className="Profile-inputgroup Profile-funds">
                    <div className="Profile-col-25">
                        <label htmlFor="currentFunds">Current Funds</label>
                    </div>
                    <div className="Profile-col-45">
                        <input disabled="disabled" type="text" placeholder={`$${useProfile.currencyAmount}`} name="currentFunds" id="currentFunds"></input>
                    </div>
                    <div className="Profile-col-30 Profile-funds" onClick={addFundsButton}>
                        <div className="Profile-addfunds"><span>Add Funds</span></div>
                    </div>
                </div>

                <div className="Profile-inputgroup">

                    <div className="Profile-col-25">
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="text" placeholder={useProfile.firstName} name="firstName" id="firstName" onChange={handleChange} minLength="1" maxLength="30"></input>
                    </div>

                </div>

                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="text" placeholder={useProfile.lastName} name="lastName" id="lastName" onChange={handleChange} minLength="1" maxLength="30" ></input>
                    </div>
                </div>

                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="lastName">Email</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="email" placeholder={useProfile.email} name="email" id="email" onChange={handleChange} minLength="6" maxLength="60"></input>
                    </div>
                </div>

                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="newPassword">New Password</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="password" placeholder="Enter a new password" name="password" id="password" onChange={handleChange} minLength="5" maxLength="30"></input>
                    </div>
                </div>

                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="secondPw">Re-enter New Password</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="password" placeholder="Re-enter password from above" name="secondPw" id="secondPw" onChange={handleChange} minLength="5" maxLength="30"></input>
                        {!newPasswordCheck && <div className="Profile-newpwwarning">Password must match above.</div>}
                    </div>
                </div>

                <hr />
                <div className="Profile-inputgroup">
                    <div className="Profile-col-25">
                        <label htmlFor="currPassword">Current Password</label>
                    </div>
                    <div className="Profile-col-75">
                        <input type="password" placeholder="Enter current password to save.." name="currPassword" id="currPassword" onChange={handleChange} minLength="5" maxLength="30"></input>
                    </div>
                </div>
                <div className="Profile-submitbutton">
                    {form.currPassword.length > 5 && newPasswordCheck
                        ? <button className="Profile-button">Save</button>
                        : <button disabled className="Profile-button-disabled">Save</button>}
                </div>

            </form>
        </div>
    )
}

export default UserProfile;