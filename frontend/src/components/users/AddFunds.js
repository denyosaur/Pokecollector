import React from "react";

//import HomepageCardCarousel from "./HomepageCardCarousel";
import StoreApi from "../../api/store-api";

import useFields from "../../hooks/useFields";

import "../../css/users/addfunds.css";

const AddFunds = ({ token, username, setOpenAddFunds, setUpdatedCurrency }) => {
    const INITIAL_STATE = { funds: 0 };
    const [formData, handleChange] = useFields(INITIAL_STATE); //hook for field changes


    const handleAddFunds = async () => {
        const data = { funds: parseInt(formData.funds) }; //create data object to be sent to API 
        const res = await StoreApi.addFunds(username, token, data); //call patch request through API
        const newAmount = parseInt(res.updatedAmount.currencyAmount); //get new amount and convert to integer
        setUpdatedCurrency(newAmount); //set useState to new amount for component rerender
        setOpenAddFunds(false); //close the funds box
    };

    const handleClose = () => {
        setOpenAddFunds(false);
    }


    return <div className="AddFunds">
        <div className="AddFunds-container">
            <div className="AddFunds-form">
                <label htmlFor="funds">Add Funds</label>
                <input type="number" placeholder="Enter amount to add" name="funds" id="funds" onChange={handleChange}></input>
            </div>
            <div className="AddFunds-buttons">
                <button className="AddFunds-add" onClick={handleAddFunds}>Add Funds</button>
                <button className="AddFunds-cancel" onClick={handleClose}>Cancel</button>
            </div>
        </div>

    </div>
};

export default AddFunds;