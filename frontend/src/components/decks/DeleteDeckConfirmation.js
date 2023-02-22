import React from "react";



import "../../css/decks/deletedeckconfirmation.css";

const DeleteDeckConfirmation = ({ deckName, handleDelete, handleChange, setIsDeletePromptOpen }) => {

    const handleDeletePromptClose = () => {
        setIsDeletePromptOpen(false);
    };

    return (
        <div className="DeleteDeckConfirmation" >
            <div className="DeleteDeckConfirmation-cancel" onClick={handleDeletePromptClose}>
                <i className="bi bi-x"></i>
            </div>
            <form className="DeleteDeckConfirmation-form" >
                <label htmlFor="deleteConfirm">Delete '{deckName}' forever?</label>
                <input type="text" id="deleteConfirm" name="deleteConfirm" placeholder="Type delete here..." onChange={handleChange}></input>
                <button className="DeleteDeckConfirmation-button" onClick={handleDelete}>Delete</button>
            </form>

        </div>
    )
};

export default DeleteDeckConfirmation;