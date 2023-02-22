import React, { useEffect, useState } from "react";

import HomepageCardCarousel from "./HomepageCardCarousel";
import HomepageCarousel from "./HomepageCarousel";

import "../../css/homepage/homepage.css";

/** cardsToSearch is hard coded here for the card carousels
 * cardsToSearch is hard coded, but the functionality that follows can auto update depending on what additional
 * key-value properties are added to the cardsToSearch object.
 */

const Homepage = () => {
    const [cardCarousel, setCardCarousel] = useState([]);
    useEffect(() => {
        const cardsToSearch = {
            rarity: 'Rare Holo',
            types: 'Psychic',
            setName: 'Fossil'
        };
        setCardCarousel(Object.entries(cardsToSearch).map(topic => {
            return <HomepageCardCarousel topic={topic} key={topic[0]} />
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCardCarousel]);

    return <div className="Homepage">
        <div className="Homepage-container">
            <div className="Homepage-maincarousel">
                <HomepageCarousel />
            </div>
            {cardCarousel && cardCarousel}
        </div>
    </div>
};

export default Homepage;