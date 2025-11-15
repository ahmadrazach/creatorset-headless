/* eslint-disable react/function-component-definition */
import { useMantineTheme } from "@mantine/core";
import React from "react";
import styled from "styled-components";

interface LoadingBarProps {
    progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
    const theme = useMantineTheme();
    const LoadingBarContainer = styled.div`
        width: 100%;
        height: 20px;
        background-color: ${theme.colorScheme === "dark"
            ? "#23222a"
            : "#E7E5E8"};
        position: relative;
        margin-bottom: 20px;
    `;

    const LoadingBarProgress = styled.div<LoadingBarProps>`
        width: ${props => props.progress || 0}%;
        height: 100%;
        background-color: #ef174b;
        position: absolute;
        top: 0;
        left: 0;
    `;
    return (
        <LoadingBarContainer>
            <LoadingBarProgress progress={progress} />
        </LoadingBarContainer>
    );
};

export default LoadingBar;
