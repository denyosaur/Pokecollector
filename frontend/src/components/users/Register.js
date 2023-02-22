import React from "react";
import { useHistory } from "react-router-dom";

// import handleFormSubmit from "../../hooks/handleFormSubmit";

import UsersApi from "../../api/users-api"
import useFields from "../../hooks/useFields";

import "../../css/register.css";

const Register = ({ setAuthed, handleFormOpen }) => {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const [formData, setFormData] = useFields(INITIAL_STATE); //hook for field changes

    const handleSubmit = async (evt) => {
        evt.preventDefault(); //stop page from reloading

        const registration = await UsersApi.register(formData); //make login request and get token

        setAuthed(registration.token) //set authed to the token from localStorage
        localStorage.setItem("authorization", registration.token); //store token in localStorage
        localStorage.setItem("username", formData.username); //store username in localStorage
        handleFormOpen({ evt: { target: { innerText: "reset" } } });
        history.push("/"); //push homepage to history 
    };

    return (
        <div className="Register">
            <h3 className="Register-header">Sign Up</h3>
            <i class="bi bi-x-lg Register-formClose" onClick={handleFormOpen} ></i>
            <p className="Register-agreement">By continuing, you agree to our User Agreement and Privacy Policy.</p>
            <form onSubmit={handleSubmit} className="Register-form">

                <label htmlFor="username"></label>
                <input type="text" placeholder="Username" name="username" id="username" onChange={setFormData}></input>

                <label htmlFor="password"></label>
                <input type="password" placeholder="Password" name="password" id="password" onChange={setFormData}></input>

                <label htmlFor="firstName"></label>
                <input type="text" placeholder="First Name" name="firstName" id="firstName" onChange={setFormData}></input>

                <label htmlFor="lastName"></label>
                <input type="text" placeholder="Last Name" name="lastName" id="lastName" onChange={setFormData}></input>

                <label htmlFor="email"></label>
                <input type="email" placeholder="Email" name="email" id="email" onChange={setFormData}></input>

                <button className="Register-button">Register</button>
                <div className="Register-switchform">
                    <p>Already a Pokecollector? <span className="Register-login" onClick={handleFormOpen}>Login</span></p>
                </div>
            </form>
        </div>
    )
};

export default Register;