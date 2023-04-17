import React, { useContext } from "react";
import T from 'prop-types';

import CartContext from "../../../context/CartContext";

import {
  Button,
  CardName,
  MiniCardCol1,
  MiniCardCol2,
  MiniCardContainer,
  MiniCardImage,
  MiniCardImageWrapper,
  MiniCardInfoContainer,
  Price,
  Rarity,
  SetLogo,
  SetLogoWrapper,
  SetName,
} from './styledComponents';

const MiniCard = ({
  card: {
    id,
    name,
    setName,
    setLogo,
    images,
    prices,
    rarity
  },
  moreInfo,
  fromShopPage,
}) => {
  const fixedPrice = (+prices).toFixed(2);
  const Cart = useContext(CartContext);

  const cartAdd = () => {
    const toAdd = {
      id: id,
      name: name,
      images: images,
      prices: prices,
      setName: setName,
      rarity: rarity
    }
    Cart.addToCart(toAdd);
  };

  return (
    <MiniCardContainer>
      <MiniCardImageWrapper>
        <MiniCardImage
          alt={`${name} card`}
          data={id}
          onClick={moreInfo}
          src={images}
        />
      </MiniCardImageWrapper>
      <MiniCardInfoContainer>
        <MiniCardCol1>
          <Price>${fixedPrice}</Price>
          <CardName>{name}</CardName>
          <SetName>{setName}</SetName>
          <Rarity>{rarity}</Rarity>
        </MiniCardCol1>
        <MiniCardCol2>
          <Button fromShopPage={fromShopPage}>
            {fromShopPage
              ? <i className="bi bi-cart-plus" data={id} onClick={cartAdd}></i>
              : <i className="bi bi-info-circle" data={id} onClick={moreInfo}></i>
            }
          </Button>
          <SetLogoWrapper>
            <SetLogo
              alt={`${setName} logo`}
              src={setLogo}
            />
          </SetLogoWrapper>
        </MiniCardCol2>
      </MiniCardInfoContainer>
    </MiniCardContainer>
  )
};

MiniCard.propTypes = {
  card: T.object.isRequired,
  moreInfo: T.func.isRequired,
  fromShopPage: T.bool.isRequired,
};

export default MiniCard;
