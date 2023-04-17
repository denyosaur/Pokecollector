import styled from 'styled-components';

export const MiniCardContainer = styled.div`
  background-color:rgb(241, 243, 248);
  border-radius:5px;
  box-shadow:0 0 10px rgba(0,0,0,0.6);
  height: 18.7rem;
  margin: 1.57rem;
  width: 9.38rem;
`;

export const Button = styled.button`
  background-color: ${({ fromShopPage }) => fromShopPage ? '#0275d8' : '#5cb85c'};
  border-radius: 3rem;
  border: 0;
  bottom: 1.2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  cursor: 'pointer';
  font-size: 1.4rem;
  height: 2.5rem;
  left: 0.3rem;
  position: relative;
  width: 2.5rem;
  z-index: 4;
`;

export const CardName = styled.p`
  font-weight: bold;
  margin: 0;
`;

export const MiniCardCol1 = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MiniCardCol2 = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 2rem;
`;

export const MiniCardImage = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0 8px 6px -6px rgba(0,0,0,0.6);
  cursor: pointer;
  display: block;
  height: 13rem;
  margin-left: auto;
  margin-right: auto;
  width: 9.38rem;
`;

export const MiniCardImageWrapper = styled.div`
  height: 13rem;
  width: 9.38rem;
`;

export const MiniCardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
`;

export const Price = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

export const Rarity = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const SetLogo = styled.img`
  height: auto;
  max-height: 2rem;
  max-width: 3rem;
  width: auto;
`;

export const SetLogoWrapper = styled.div`
  height: 1.8rem;
  position: relative;
  right: 1rem;
`;

export const SetName = styled.p`
  bottom: 3px;
  font-size: 12px;
  margin: 0;
  position: relative;
  white-space: nowrap;
`;
