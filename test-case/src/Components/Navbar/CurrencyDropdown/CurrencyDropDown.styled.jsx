import styled from "styled-components";
export const DropDown = styled.div`
    position: absolute;
    left: calc(90%-10rem);
    bottom: calc(100%-5rem);
    padding: .75rem;
    border-radius: .25rem;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, .7);
    opacity: 1;
    z-index: 20;
    background-color: white;
`

export const Currency = styled.div`
    :hover{
        color: #5ece7b;
        cursor:pointer;
    }
`