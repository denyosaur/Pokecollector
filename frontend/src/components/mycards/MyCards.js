import React, { useEffect, useState } from "react";

import CardsApi from "../../api/cards-api";

import CardSearch from "../Cards/CardSearch";
import CardsList from "../Cards/CardsList";
import CardDetails from "../Cards/CardDetails";
import Loading from "../navigation/Loading";

import "../../css/mycards/mycards.css";


const MyCards = () => {
    const searchOwnedCards = CardsApi.searchOwnedCards;
    const [cards, setCards] = useState([]);//for list of all cards returned from GET Request
    const [cardId, setCardId] = useState(false);//used for opening and fetching more card details
    const [fromShopPage] = useState(false); //for minicards to display info icon
    const [isLoading, setIsLoading] = useState(false); //to display loading gif while waiting for promise

    //click handler to set useState for cardId and open card details pop up
    const moreInfo = (evt) => {
        const id = evt.target.getAttribute("data");
        setCardId(id);
    };

    //click handler to close card details popup
    const handleCloseCardDetails = () => {
        setCardId(false);
    };

    useEffect(() => {
        let token = localStorage.getItem("token") || false;
        let username = localStorage.getItem("username") || false;

        async function getOwnersCards() {
            setIsLoading(true); //set loading to true to display loading gif
            let ownedCards = []; //array to hold cardInfo
            const cardsRes = await CardsApi.getOwnedCards(username, token); //get card info from API

            //response will return array of objects. within object contains cardInfo, so must push card.cardInfo
            cardsRes.cards.forEach(card => {
                ownedCards.push(card.cardInfo);
            });

            setCards(ownedCards); //set useState to hold response

            setIsLoading(false); //set loading to false
        };

        getOwnersCards();
    }, []);

    return (
        <div className="MyCards" >
            <CardSearch setCards={setCards} getCards={searchOwnedCards} fromShopPage={fromShopPage} />
            <div className="MyCards-cards">
                {isLoading
                    ? <Loading />
                    : <CardsList cards={cards} moreInfo={moreInfo} fromShopPage={fromShopPage} />}
            </div>
            {cardId && <div className="MyCards-details">
                <CardDetails cardId={cardId} setCardId={setCardId} handleCloseCardDetails={handleCloseCardDetails} />
            </div>}
        </div>)
};

export default MyCards;