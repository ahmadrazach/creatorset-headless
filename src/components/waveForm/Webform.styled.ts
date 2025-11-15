import styled from "styled-components";

export const WaveformContianer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100%;
    background: transparent;
    gap: 2rem;
`;

export const Wave = styled.div`
    width: 100%;
    height: 60px;
    background: ${props => {
        return props.theme.colorScheme === "dark" ? "#1F1E25" : "#E7E5E8";
    }};
    border-radius: 50px;
    position: relative;
    left: -70px;
    z-index: -1;
    > :first-child {
        display: none !important;
    }
    > :nth-child(2) {
        height: 35px !important;
        margin: 12px 20px 10px 50px !important;
    }
`;

export const PlayButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 65px;
    color: #ef174b;
    background: #ef174b;
    border-radius: 50%;
    border: 1px solid #ef174b;
    outline: 1px solid #ef174b;
    cursor: pointer;
    background: ${props => {
        return props.theme.colorScheme === "dark" ? "#1F1E25" : "#E7E5E8";
    }};
`;
