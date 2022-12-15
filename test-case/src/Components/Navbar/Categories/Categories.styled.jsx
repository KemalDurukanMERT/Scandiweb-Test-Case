import styled from "styled-components";

export const CategoryItem = styled.div`
  display: inline-block;
`;

export const Button = styled.div`
  background-color: transparent;
  border: none;
  margin: 0.7rem;
  cursor: pointer;
  line-height: 20px;
  font-weight: 600 normal;
  font-size: 1.3rem;
  font-style: normal;
  text-transform: uppercase;
  padding-bottom: 16px;
  text-decoration: none;
  color: black;
  :hover {
    border-bottom: #5ece7b solid;
    color: #5ece7b;
  }
`;
