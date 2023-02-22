import React, { useEffect, useState } from "react";

import CardsApi from "../../api/cards-api";

import CardSearch from "../Cards/CardSearch";
import CardsList from "../Cards/CardsList";
import CardDetails from "../Cards/CardDetails";
import Loading from "../navigation/Loading";

import "../../css/store/store.css";

const Store = () => {
    const getStoreCards = CardsApi.getCards;
    const [cardId, setCardId] = useState(false); //used for opening and fetching more card details
    const [cards, setCards] = useState([]); //for list of all cards returned from GET Request
    const [fromShopPage] = useState(true); //for minicards to display cart icon
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
        async function getAllCards() {
            setIsLoading(true); //set loading to true to display loading gif
            const cardsRes = await getStoreCards(); //get card info from API
            setCards(cardsRes.cards); //set useState to hold response
            setIsLoading(false); //set loading to false
        }
        getAllCards();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="Store">
        <CardSearch setCards={setCards} getCards={getStoreCards} fromShopPage={fromShopPage} />
        <div className="Store-cards">
            {isLoading
                ? <Loading />
                : <CardsList cards={cards} moreInfo={moreInfo} fromShopPage={fromShopPage} />}
        </div>
        {cardId && <div className="MyCards-details">
            <CardDetails cardId={cardId} setCardId={setCardId} handleCloseCardDetails={handleCloseCardDetails} />
        </div>}
    </div>
};

export default Store;