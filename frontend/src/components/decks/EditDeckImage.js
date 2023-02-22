import React, { useEffect, useState } from "react";

import "../../css/decks/editdeckinfo.css";

const EditDeckImage = ({ colCards, form, handleChange, imageValue }) => {
    const [deckImageOptions, setDeckImageOptions] = useState([]); //useState for deck cover image

    //when either deckName or deckCards are updated, reload 
    useEffect(() => {
        const defaultImage = { cardName: "Default Image", cardImage: "https://i.imgur.com/QykX2aC.jpg" }
        if (colCards.length > 0) {
            let cardImages = new Set();
            let imageDuplicate = new Set();
            colCards.forEach(card => {
                const { name, images } = card;
                if (!imageDuplicate.has(name)) {
                    cardImages.add({ cardName: name, cardImage: images });
                    imageDuplicate.add(name);
                }
            });
            const cardImagesArr = Array.from(cardImages);
            setDeckImageOptions([defaultImage, ...cardImagesArr]);
        } else {
            setDeckImageOptions([defaultImage]);
        }
    }, [colCards, imageValue]);

    return (

        <div className="EditDeckInfo-image">
            <label htmlFor="deckImage">Deck Image: </label>
            <select id="deckImage" name="deckImage" onChange={handleChange} value={form.deckImage}>
                {deckImageOptions.map((card, idx) => {
                    return <option value={card.cardImage} key={`${card.cardName}_${idx}`}>{card.cardName}</option>
                })}
            </select>
        </div>

    )
};

export default EditDeckImage;