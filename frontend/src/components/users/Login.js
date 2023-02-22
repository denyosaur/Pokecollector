import React from "react";
import { useHistory } from "react-router-dom";

// import handleFormSubmit from "../../hooks/handleFormSubmit";
import UsersApi from "../../api/users-api";
import useFields from "../../hooks/useFields";

import "../../css/login.css";

const Login = ({ setAuthed, handleFormOpen }) => {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const [formData, handleChange] = useFields(INITIAL_STATE); //hook for field changes

    const handleSubmit = async (evt) => {
        evt.preventDefault(); //stop page from reloading

        const login = await UsersApi.login(formData); //make login request and get token

        setAuthed(login.token) //set authed to the user tokwn
        localStorage.setItem("token", login.token); //store token in localStorage
        localStorage.setItem("username", formData.username); //store username in localStorage
        if (login.isAdmin) localStorage.setItem("isAdmin", login.isAdmin); //store admin status in localStorage if user is an admin
        handleFormOpen({ evt: { target: { innerText: "reset" } } });
        history.push("/"); //push homepage to history 
    };

    return (
        <div className="Login">
            <h3 className="Login-header">Login</h3>
            <i className="bi bi-x-lg Login-formClose" onClick={handleFormOpen} ></i>
            <p className="Login-agreement">By continuing, you agree to our User Agreement and Privacy Policy.</p>
            <form onSubmit={handleSubmit} className="Login-form">
                <label htmlFor="username"></label>
                <input type="text" placeholder="Username" name="username" id="username" onChange={handleChange}></input>

                <label htmlFor="password"></label>
                <input type="password" placeholder="Password" name="password" id="password" onChange={handleChange}></input>
                <button className="Login-button">Submit</button>
                <div className="Login-switchform">
                    <p>New to Pokecollector? <span className="Login-signup" onClick={handleFormOpen}>Sign Up</span></p>
                </div>
            </form>
        </div>
    )
};

export default Login;