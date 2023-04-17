import React, { useState, useEffect } from "react";

import CardCarousel from "./CardCarousel";
import CardDetails from "../Cards/CardDetails";

import CardsApi from "../../api/cards-api";

import "../../css/homepage/homepagecardcarousel.css";

const HomepageCardCarousel = ({ topic }) => {
    const getStoreCards = CardsApi.getCards;
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState(false);
    const [numberOfCardsToShow, setNumberOfCardsToShow] = useState(5);
    const [currentCardIndicesToShow, setCurrentCardIndicesToShow] = useState([0, 1]);

    useEffect(() => {
        async function getCarouselCards() {
            const searchQuery = {};
            searchQuery[topic[0]] = topic[1]
            const searchRes = await getStoreCards(searchQuery);
            setCards(searchRes.cards);
        };

        function windowSizeCheck() {
            let currentWindowSize = window.innerWidth;
            let cardsToShow = 0;

            if (currentWindowSize < 516) {
                cardsToShow = 1;
            } else if (currentWindowSize >= 516 && currentWindowSize < 768) {
                cardsToShow = 2;
            } else if (currentWindowSize >= 768 && currentWindowSize < 992) {
                cardsToShow = 3;
            } else if (currentWindowSize >= 992 && currentWindowSize < 1200) {
                cardsToShow = 4;
            } else {
                cardsToShow = 5;
            };

            setCurrentCardIndicesToShow([0, cardsToShow]);
            setNumberOfCardsToShow(cardsToShow);
        };

        window.addEventListener("resize", windowSizeCheck);

        windowSizeCheck();
        getCarouselCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);


    const moreInfo = (evt) => {
        const id = evt.target.getAttribute("data");
        setCardId(id);
    };

    //click handler to close card details popup
    const handleCloseCardDetails = () => {
        setCardId(false);
    };

    const carouselButtonListener = (buttonDirection) => {
        switch (buttonDirection) {
            case "left":
                let startIndex = Math.max(0, currentCardIndicesToShow[0] - numberOfCardsToShow);
                let endIndex = startIndex + numberOfCardsToShow;

                setCurrentCardIndicesToShow([startIndex, endIndex]);
                return;
            case "right":
                let updatedIndex = currentCardIndicesToShow[0] + numberOfCardsToShow;
                let lastIndex = cards.length - 1;
                if (updatedIndex > lastIndex) return

                let correctIndecies = [updatedIndex, updatedIndex + numberOfCardsToShow]

                setCurrentCardIndicesToShow(correctIndecies);
                return;
            default:
                break;
        }
    };

    return <div className="HomepageCardCarousel">
        <div className="HomepageCardCarousel-header">
            <h3>Top {topic[1]} Cards</h3>
        </div>
        <div className="HomepageCardCarousel-carousel">
            <div className="HomepageCardCarousel-button" >
                <i className="bi bi-arrow-left-circle-fill" onClick={() => carouselButtonListener("left")}></i>
            </div>
            <CardCarousel cards={cards} moreInfo={moreInfo} currentCardIndicesToShow={currentCardIndicesToShow} />
            <div className="HomepageCardCarousel-button" >
                <i className="bi bi-arrow-right-circle-fill" onClick={() => carouselButtonListener("right")}></i>
            </div>
        </div>
        {cardId && <div className="MyCards-details">
            <CardDetails cardId={cardId} setCardId={setCardId} handleCloseCardDetails={handleCloseCardDetails} />
        </div>}
    </div>
};

export default HomepageCardCarousel;