import React, { useEffect, useState } from "react";

import DecksApi from "../../api/deck-api";

import DeckBox from "./DeckBox";
import EditDeck from "./EditDeck";
import NotificationCard from "../navigation/NotificationCard";
import Loading from "../navigation/Loading";

import "../../css/decks/mydecks.css";

const MyDecks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState(false);
    const [decks, setDecks] = useState([]); //useState for creating deckboxes and passing through deck information 
    const [deckStatus, setDeckStatus] = useState(false); //useState for reloading component after deleting a deckbox
    const [editDeck, setEditDeck] = useState(false); //useState for showing deck boxes, or edit deck component. Also holds the deck ID being edited
    const [token, setToken] = useState(""); //useState for token - used a lot in this page
    const [username, setUsername] = useState(""); //useState for username - used a lot in this page
    const newDeck = {
        deckId: "newDeck",
        deckName: "Create New Deck",
        deckImage: [" ", "https://i.imgur.com/zyEsx2t.png"]
    }

    //click handler for when a deck box gets clicked. sets editDeck useState to the clicked deck's ID
    const editDeckHandler = (deckId) => {
        setEditDeck(deckId);
    };


    useEffect(() => {
        //set username and tokens to useStates
        let lsUsername = localStorage.getItem("username") || false;
        let lsToken = localStorage.getItem("token") || false;
        setToken(lsToken);
        setUsername(lsUsername);

        //use API to get decks info and set in setDecks. 
        async function getDecks() {
            const deckRes = await DecksApi.getDecks(lsUsername, lsToken);

            setDecks(deckRes.decks);
            setIsLoading(false);
        };

        getDecks();
    }, [editDeck, deckStatus]);

    return (isLoading
        ? <Loading />
        : (<div className="MyDecks">
            <div className="MyDecks-notification">
                {notification && <NotificationCard notification={notification} setNotification={setNotification} />}
            </div>
            {!editDeck ? (<div className="MyDecks-decklist">
                <DeckBox deck={newDeck} editDeckHandler={editDeckHandler} token={token} username={username} setNotification={setNotification} setEditDeck={setEditDeck} setDeckStatus={setDeckStatus} />
                {decks.map(deck => {
                    return (
                        <div className="MyDecks-deck" key={deck.deckId}>
                            <DeckBox deck={deck} editDeckHandler={editDeckHandler} token={token} username={username} setNotification={setNotification} setEditDeck={setEditDeck} setDeckStatus={setDeckStatus} />
                        </div>
                    )
                })}
            </div>)
                : (<EditDeck deckId={editDeck} setEditDeck={setEditDeck} setNotification={setNotification} token={token} username={username} />)}
        </div>)
    )
};

export default MyDecks;