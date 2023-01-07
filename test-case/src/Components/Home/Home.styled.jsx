import styled from "styled-components";

export const HomeComponent = styled.div`
  position: relative;
`

export const CategoryName = styled.div`
  margin-left: 6.5rem;
  margin-top:1rem;
  padding-top: 2rem;
  font-weight: 600 normal;
  font-size: 4rem;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ProductList = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: start;
  gap: 4rem;
  padding: 2rem 5rem 5rem 5rem;
`;

export const ProductCart = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  width: 25vw;
  :hover {
    transition: all 300ms ease-in-out;
    transform: scale(1.05);
    box-shadow: 4px 4px 40px 10px rgba(0, 0, 0, 0.3);
  }

  .cartAddIcon {
    display: none;
    position: absolute;
    right: 1rem;
    bottom: 5rem;
    cursor: pointer;

    :hover {
      transition: all 300ms ease-in-out;
      transform: scale(1.3);
    }
  }

  :hover .cartAddIcon {
    display: inline;
  }
`;

export const ImageDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:1rem;
`;

export const Image = styled.img`
  width: 80%;
  height: 15rem;
  object-fit: contain;
`;

export const OutOfStock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  opacity:0.3;
  z-index:2;
`;

export const PriceArea = styled.div`
  font-weight:700;
  margin-top:1rem;
`


export const MainOpacity = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(57,55,72,0.22);
  z-index:40;
`