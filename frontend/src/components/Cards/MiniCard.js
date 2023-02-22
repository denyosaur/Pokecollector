import React, { useContext } from "react";

import CartContext from "../../context/CartContext";

import "../../css/cards/minicard.css"

const MiniCard = ({ card, moreInfo, fromShopPage }) => {
    const {
        id,
        name,
        setName,
        setLogo,
        images,
        prices,
        rarity } = card;

    const Cart = useContext(CartContext);

    let fixedPrice = (+prices).toFixed(2);

    function cartAdd() {
        //cart requires name, images, prices, id
        const toAdd = {
            id: id,
            name: name,
            images: images,
            prices: prices,
            setName: setName,
            rarity: rarity
        }
        Cart.addToCart(toAdd);
    }

    return (
        <div className="MiniCard" data={id} >
            <div className="MiniCard-container" data={id} >
                <div className="MiniCard-image" data={id} >
                    <img src={images} alt={`${name} card`} data={id} onClick={moreInfo} />
                </div>
                <div className="MiniCard-info" data={id} >
                    <div className="MiniCard-info-col" data={id} >
                        <div className="MiniCard-info-price" data={id} >
                            <span className="MiniCard-info-price" data={id} >${fixedPrice}</span>
                        </div>
                        <div className="MiniCard-info-header" data={id} >
                            <span data={id} >{name}</span>
                        </div>
                        <div className="MiniCard-info-setname" data={id} >
                            <span data={id} >{setName}</span>
                        </div>

                        <div className="MiniCard-info-rarity" data={id} >
                            <span data={id} >{rarity}</span>
                        </div>
                    </div>
                    <div className="MiniCard-info-col" data={id} >
                        {fromShopPage
                            ? <div className="MiniCard-addtocart" data={id}  >
                                <button><i className="bi bi-cart-plus" data={id} onClick={cartAdd}></i></button>
                            </div>
                            : <div className="MiniCard-info-button" data={id}  >
                                <button><i className="bi bi-info-circle" data={id} onClick={moreInfo}></i></button>
                            </div>}
                        <div className="MiniCard-info-setlogo" data={id} >
                            <img src={setLogo} alt={`${setName} logo`} data={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

export default MiniCard;