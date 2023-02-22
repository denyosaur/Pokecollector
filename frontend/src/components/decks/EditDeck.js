import React, { useEffect, useState } from "react";

import DecksApi from "../../api/deck-api";
import CardsApi from "../../api/cards-api";

import EditDeckInfo from "./EditDeckInfo";
import DeckCardLibrary from "./DeckCardLibrary";
import EditDeckColumn from "./EditDeckColumn";

import "../../css/decks/editdeck.css";

const EditDeck = ({ deckId, setEditDeck, setNotification, token, username }) => {
    const INITIAL_STATE = { deck: { deckName: "", deckImage: "" }, cards: [] };
    const [deckInfo, setDeckInfo] = useState(INITIAL_STATE);//set state for cards in deck
    const [updatedDeckInfo, setUpdatedDeckInfo] = useState(INITIAL_STATE);//set state for cards in deck
    const [ownedCards, setOwnedCards] = useState([]);//set state for cards in deck
    const [colCards, setColCards] = useState([]);//set state for cards in deck
    const [toUpdate, setToUpdate] = useState(new Set());//set state for holding card ownedIds for updating DB when saving

    //function to add card to toUpdate state and to deckCards states. To be used in <OwnedCard />.
    const addToDeck = (ownedId, card) => {
        const inDeckAlready = toUpdate.has(ownedId); //check if toUpdate contains the ownedId
        if (!inDeckAlready) {
            setToUpdate(previous => new Set(previous.add(ownedId))); //update toUpdate state by adding ownedId to new Set
            setColCards([...colCards, card]); //update colCards state to contain the card info for column populating
        };
    };

    //function to remove card from toUpdate state and from colCards states. To be used in <ColumnCard />.
    const removeFromDeck = (ownedId, toRemove) => {
        const inDeck = toUpdate.has(ownedId); //check if toUpdate contains the ownedId

        if (inDeck) {
            const updateArr = [...toUpdate].filter(id => id !== ownedId); //create new array filtering out owned ID
            setToUpdate(new Set(updateArr)); //update toUpdate state by removing ownedId and create new Set

            const updateCol = [...colCards].filter(card => card !== toRemove); //create new array filtering out card info
            setColCards(updateCol); //update colCards state to remove the card info from the column
        };
    };

    //function to save deck to DB. To be used in <ColumnCard />.
    const saveDeck = async () => {
        try {
            if (updatedDeckInfo.deckName === "") throw new Error("Must fill out a deck name!");
            const successMsg = {
                message: { message: "Successfully saved deck!" },
                status: "success"
            }
            const updatedDeck = { updatedDeck: [...toUpdate] } //array of ownedIds
            const updatedInfo = { deckName: updatedDeckInfo.deckName, deckImage: updatedDeckInfo.deckImage };
            if (deckId !== "newDeck") {
                await DecksApi.updateCardsInDeck(username, token, deckId, updatedDeck); //update cards in DB
                await DecksApi.updateDeckInfo(username, token, deckId, updatedInfo); //update name of deck
            } else {
                const newDeckRes = await DecksApi.createDeck(username, token, updatedInfo); //create a new deck
                if (updatedDeck.updatedDeck.length > 0) {
                    await DecksApi.updateCardsInDeck(username, token, newDeckRes.deck.deckId, updatedDeck); //update cards in DB
                }
            }

            setNotification(successMsg);
            setTimeout(() => {
                setNotification(false); //push profile to history 
            }, 3000);
            setEditDeck(false); //send user back to deck page
        } catch (error) {
            const errorMsg = {
                message: { message: error[0] },
                status: "error"
            }
            setNotification(errorMsg);
        }
    };

    //function to cancel editing deck, does not save. To be used in <ColumnCard />.
    const cancelEdit = async () => {
        setEditDeck(false);
    };

    //when a deck is selected, deckId state is updated, which runs this useEffect
    useEffect(() => {
        async function getDeckInfo() {
            const deckRes = await DecksApi.getDeckInfo(username, token, deckId); //get cards in deck from DB

            //forEach card in deck, update the toUpdate state with ownedId
            deckRes.cards.forEach(card => {
                setToUpdate(previous => new Set(previous.add(card.ownedId)))
            });

            setDeckInfo(deckRes); //set deck info
            setUpdatedDeckInfo({ deckName: deckRes.deck.deckName, deckImage: deckRes.deck.deckImage });
            setColCards(deckRes.cards); //set state for cards in deck
        };
        async function getOwnedCards() {
            const ownedCardsRes = await CardsApi.getOwnedCards(username, token); //get all owner's cards

            setOwnedCards(ownedCardsRes.cards); //set all owned cards here
        };

        getOwnedCards();
        if (deckId !== "newDeck") getDeckInfo();

    }, [deckId, token, username]);

    return (
        <div className="EditDeck" >
            <div className="EditDeck-col1">
                <div className="EditDeck-info">
                    <EditDeckInfo deckInfo={deckInfo} setUpdatedDeckInfo={setUpdatedDeckInfo} colCards={colCards} />
                </div>
                <div className="EditDeck-MyCards">
                    <DeckCardLibrary addToDeck={addToDeck} ownedCards={ownedCards} toUpdate={toUpdate} />
                </div>
            </div>
            <div className="EditDeck-col2">
                <div className="EditDeck-column">
                    <EditDeckColumn colCards={colCards} deckInfo={deckInfo} removeFromDeck={removeFromDeck} />
                </div>
                <div className="EditDeck-buttons">
                    {updatedDeckInfo.deckName !== ""
                        ? <button className="EditDeck-save" onClick={saveDeck}>Save Deck</button>
                        : <button className="EditDeck-save" disabled onClick={saveDeck}>Save Deck</button>}
                    <button className="EditDeck-cancel" onClick={cancelEdit}>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default EditDeck;