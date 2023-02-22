import React, { useEffect, useState } from "react";

import CardsApi from "../../api/cards-api";

import useFields from "../../hooks/useFields";

import "../../css/cards/cardsearch.css"

const CardSearch = ({ setCards, getCards, fromShopPage }) => {
    const token = localStorage.getItem("token") || false;
    const username = localStorage.getItem("username") || false;

    const INITIAL_STATE = {
        name: "",
        minPrice: "",
        maxPrice: "",
        rarity: "",
        types: "",
        setName: ""
    };

    const [formData, handleChange, setFormData] = useFields(INITIAL_STATE); //hook for field changes
    const [searchSetName, setSearchSetNames] = useState([]);

    useEffect(() => {
        async function getSetNames() {
            const sets = await CardsApi.getSetNames();

            setSearchSetNames(sets.setNames);
        }
        getSetNames();
    }, []);

    const clearForm = (evt) => {
        evt.preventDefault();
        setFormData(INITIAL_STATE);
        getCardsForShopOrUserOwned({});
    };

    const handleSearch = (evt) => {
        evt.preventDefault();
        async function searchCardFiltered() {
            let data = {};

            for (let key in formData) {
                if (formData[key] !== "") {
                    data[key] = formData[key]
                };
            };
            getCardsForShopOrUserOwned(data);
        };
        searchCardFiltered();
    };

    const getCardsForShopOrUserOwned = async (data = {}) => {
        if (!fromShopPage) {
            const searchRes = await getCards(data, token, username);
            setCards(searchRes.cards.map(card => {
                return card.cardInfo;
            }));
        } else {
            const searchRes = await getCards(data, "");
            setCards(searchRes.cards);
        };
    };

    return (
        <div className="CardSearch">
            <div className="CardSearch-header">
                <span>Filters</span>
            </div>
            <form className="CardSearch-form" >
                <div className="CardSearch-input">
                    <label htmlFor="name">Card Name</label>
                    <input type="text" placeholder="Search a for a card.." name="name" id="name" onChange={handleChange} value={formData.name}></input>
                </div>

                <div className="CardSearch-input">
                    <label htmlFor="minPrice">Min. Price</label>
                    <input type="number" placeholder="Minimum Price" name="minPrice" id="minPrice" step="0.01" min="0" onChange={handleChange} value={formData.minPrice}></input>
                </div>

                <div className="CardSearch-input">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" placeholder="Maximum Price" name="maxPrice" id="maxPrice" step="0.01" min="0" onChange={handleChange} value={formData.maxPrice}></input>
                </div>

                <div className="CardSearch-input">
                    <label htmlFor="rarity">Rarity</label>
                    <select name="rarity" id="rarity" onChange={handleChange} value={formData.rarity}>
                        <option value=""></option>
                        <option value="Common">Common</option>
                        <option value="Uncommon">Uncommon</option>
                        <option value="Rare">Rare</option>
                        <option value="Rare Holo">Rare Holo</option>
                    </select>
                </div>

                <div className="CardSearch-input">
                    <label htmlFor="types">Types</label>
                    <select name="types" id="types" onChange={handleChange} value={formData.types}>
                        <option value=""></option>
                        <option value="Water">Water</option>
                        <option value="Fire">Fire</option>
                        <option value="Colorless">Colorless</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Grass">Grass</option>
                        <option value="Lightning">Lightning</option>
                        <option value="Fighting">Fighting</option>
                    </select>
                </div>

                <div className="CardSearch-input">
                    <label htmlFor="setName">Set Name</label>
                    <select name="setName" id="setName" onChange={handleChange} value={formData.setNames}>
                        <option value=""></option>
                        {searchSetName.map(setName => {
                            const name = setName.setName;
                            return <option key={name} value={name}>{name}</option>
                        })}
                    </select>
                </div>
                <div className="CardSearch-buttons">
                    <button className="CardSearch-apply" onClick={handleSearch}>Apply Filters</button>
                    <button className="CardSearch-reset" onClick={clearForm}>Clear Form</button>
                </div>

            </form>
        </div>)
};

export default CardSearch;