import styled from "styled-components";

export const Arrows = styled.div`
    display: flex;
    position: absolute;
    bottom: 16px;
    right: 16px;
`

export const Box =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.73);
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export const Right = styled.img`
    transform: rotate(180deg);
    margin-left: 8px;
`

export const Image =styled.img`
    max-width: 200px;
    max-height: 288px;
`

export const Slide = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 288px;
    width: 200px;
`