import styled from "@emotion/styled";
import { useState } from "react";

const Header = () => {
    //다른  변수 있으면 할당하기!
    return (
    <Nav>
        <Title>1 to 50</Title>
        <GameButton>게임</GameButton>
        <GameRanking>랭킹</GameRanking>
        <GameStage>
            <LevelOne>Level 1</LevelOne>
            <LevelTwo>Level 2</LevelTwo>
            <LevelThree>Level 3</LevelThree>
        </GameStage>
        <StopWatch></StopWatch>
    </Nav>
    );
};

const Nav = styled.div`
    border: 1px solid white;
    display: flex;
    align-items: center;
    gap: 1rem;
    & * {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    background-color: #A5B68D;
`
const Title = styled.h1`
    margin-left: 5rem;
`
const GameButton = styled.button`
    background-color: #ECDFCC;
    border-radius: 10%;
`
const GameRanking = styled.button`
    background-color: #ECDFCC;
    border-radius: 10%;
`
const GameStage = styled.select`
    margin-left: auto;
    background-color: #ECDFCC;
    border-radius: 10%;
`
const LevelOne = styled.option`
`
const LevelTwo = styled.option`
`
const LevelThree = styled.option`
`
const StopWatch = styled.div`
    margin-right: 5rem;
`
export default Header;