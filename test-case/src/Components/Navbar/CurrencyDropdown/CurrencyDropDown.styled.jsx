import styled from "styled-components";
export const DropDown = styled.div`
  position: absolute;
  left: 0;
  bottom: -19.2rem;
  border-radius: 0.25rem;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  opacity: 1;
  z-index: 20;
  background-color: white;
  width: 7rem;
  `;

export const Currency = styled.div`
  width: 7rem;
  height: 4rem;
  display:flex;
  align-items:center;
  justify-content: flex-start;
  padding-left: 1rem;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height:160%;
  cursor: pointer;
  :nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
