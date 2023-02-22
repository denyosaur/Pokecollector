import React, { useState } from "react";

import DecksApi from "../../api/deck-api";

import useFields from "../../hooks/useFields";
import DeleteDeckConfirmation from "./DeleteDeckConfirmation";

import "../../css/decks/deckbox.css";

const DeckBox = ({ deck, editDeckHandler, token, username, setNotification, setDeckStatus }) => {
    const INITIAL_STATE = {
        deleteConfirm: ""
    };
    const { deckId, deckName, deckImage } = deck;
    const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
    const [formData, handleChange] = useFields(INITIAL_STATE); //hook for field changes

    const handleDeleteButtonClick = () => {
        setIsDeletePromptOpen(!isDeletePromptOpen);
    }

    const handleDelete = (evt) => {
        evt.preventDefault();
        try {
            const successMsg = {
                message: { message: "Successfully deleted deck!" },
                status: "success"
            }

            if (formData.deleteConfirm.toLowerCase() !== "delete") throw new Error("Please enter 'delete' correctly!")

            async function deleteDeck() {
                await DecksApi.deleteDeck(username, token, deckId); //delete cards in DB
            };
            deleteDeck();

            setNotification(successMsg);
            setDeckStatus(true);
            setTimeout(() => {
                setNotification(false); //push profile to history 
                setDeckStatus(false);
            }, 3000);
        } catch (error) {
            const errorMsg = {
                message: error,
                status: "error"
            }
            setNotification(errorMsg);
        }

    };

    return (
        <div className="DeckBox" data={deckId} >
            {isDeletePromptOpen && <DeleteDeckConfirmation deckName={deckName} handleDelete={handleDelete} handleChange={handleChange} setIsDeletePromptOpen={setIsDeletePromptOpen} />}

            {(deckId === "newDeck")
                ? <div className="DeckBox-add">
                    <i className="bi bi-file-plus" onClick={() => editDeckHandler(deckId)}></i>
                </div>
                : <div className="DeckBox-delete" onClick={handleDeleteButtonClick}>
                    <i className="bi bi-trash"></i>
                </div>}
            <div className="DeckBox-image" onClick={() => editDeckHandler(deckId)}>
                {(deckId === "newDeck")
                    ? <img src={deckImage[1]} alt={`${deckName} card`} data={deckId} className="DeckBox-newbackgroundimage" />
                    : <img src={deckImage} alt={`${deckName} card`} data={deckId} className="DeckBox-backgroundimage" />}
            </div>
            <div className="DeckBox-name" onClick={() => editDeckHandler(deckId)}>
                {deckName}
            </div>
        </div>
    )
};

export default DeckBox;