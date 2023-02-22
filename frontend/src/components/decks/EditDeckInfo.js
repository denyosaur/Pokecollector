import React, { useEffect, useState } from "react";

import EditDeckImage from "./EditDeckImage";

import "../../css/decks/editdeckinfo.css";

const EditDeckInfo = ({ deckInfo, setUpdatedDeckInfo, colCards }) => {
    const [form, setForm] = useState({ deckName: "", deckImage: "https://i.imgur.com/QykX2aC.jpg" }); //useState for updating deck name

    //when either deckName or deckCards are updated, reload 
    useEffect(() => {
        const { deck } = deckInfo;
        const defaultImage = { cardName: "Default Image", cardImage: "https://i.imgur.com/QykX2aC.jpg" }
        const deckImg = deck.deckImage || defaultImage.cardImage

        setForm({ deckName: deck.deckName, deckImage: deckImg });
    }, [deckInfo]);

    //handleChange for deck name handling
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        const toChange = { ...form, [name]: value };
        setForm(toChange);
        setUpdatedDeckInfo(toChange);
    };

    return (
        <div className="EditDeckInfo" >
            <form className="EditDeckInfo-info">
                <div className="EditDeckInfo-name">
                    <label htmlFor="deckName">Deck Name: </label>
                    <input type="text" placeholder="Enter Deck Name.." onChange={handleChange} name="deckName" id="deckName" value={form.deckName} />
                </div>
                <EditDeckImage colCards={colCards} form={form} setForm={setForm} handleChange={handleChange} imageValue={form.deckImage} />
            </form>
        </div>
    )
};

export default EditDeckInfo;