import styled from "styled-components";

export const NavbarOutside = styled.div`
  margin: 0;
  padding: 1rem;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const MiniCartStyle = styled.div`
  margin-left: 20px;
  cursor: pointer;
  line-height: 19.2px;
  font-weight: 400 normal;
  font-size: 16px;
  font: "Raleway";
  transition: all 300ms ease-in-out;
  text-transform: uppercase;

  display: flex;
  align-items: center;

  position: relative;
  cursor: pointer;
`;

export const AmountCircle = styled.div`
  position: absolute;
    top: 25px;
    right: 65px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #1D1F22;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
`