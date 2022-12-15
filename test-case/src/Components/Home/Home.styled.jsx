import styled from "styled-components";

export const CategoryName = styled.div`
  margin: 1.7rem;
  font-weight: 600 normal;
  font-size: 4rem;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: start;
  gap: 4rem;
  margin: 1.7rem;
  padding: 1rem;
`;

export const ProductCart = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  width: 25rem;
  :hover {
    transition: all 300ms ease-in-out;

    transform: scale(1.05);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
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
  justify-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 27rem;
  object-fit: contain;
  max-width: 30rem;
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
  background: #ffffff;
  opacity: 0.5;
`;


