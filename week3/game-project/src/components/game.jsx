import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import useTimer from "./timer.jsx"; // 타이머 기능의 커스텀 훅

const Game = ({ isGameStarted, onGameStart, onGameEnd, setTimer, gameLevel }) => {
    const [blocks, setBlocks] = useState([]);
    const [nextNumber, setNextNumber] = useState(1);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [timer, resetTimer] = useTimer(isGameStarted); // 타이머와 타이머 초기화 함수

    useEffect(() => {
        initializeGame();
    }, [gameLevel]); 

    useEffect(() => {
        if (isGameStarted) {
            resetTimer(); // 게임이 시작되면 타이머 초기화
        }
    }, [isGameStarted, resetTimer]);

    const initializeGame = () => {
        const initialNumbers = Array.from({length: 9}, (_, index) => index + 1);
        const shuffledInitialNumbers = shuffleArray(initialNumbers);
        setBlocks(shuffledInitialNumbers);
        setNextNumber(1);
        setAvailableNumbers(shuffleArray(Array.from({length: 9}, (_, index) => index + 10)));
        resetTimer(); // 게임 초기화 시 타이머 리셋
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleBlockClick = (num) => {
        if (!isGameStarted && num === 1) {
            onGameStart(); // 게임 시작
            resetTimer(); // 타이머 초기화
        }

        if (num === nextNumber) {
            const newBlocks = blocks.map((block) => 
                block === num ? availableNumbers.shift() : block
            );

            setBlocks(newBlocks);
            setNextNumber(nextNumber + 1);

            if (num === 18) { 
                onGameEnd(); // 게임 종료
                initializeGame(); // 게임 재초기화
            }
        }
    };

    return (
        <Section>
            <NextNumber>다음 숫자: {nextNumber}</NextNumber>
            <GameDiv>
                {blocks.map((num, index) => (
                    <Block key={`block-${num}-${index}`} onClick={() => handleBlockClick(num)}>
                        <BlockSpan>{num}</BlockSpan>
                    </Block>
                ))}
            </GameDiv>
        </Section>
    );
};

const Section = styled.div`
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const NextNumber = styled.h1`
    margin-top: 2rem;
`;

const Timer = styled.h2``;

const GameDiv = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
`;

const Block = styled.button`
    width: 6rem;
    height: 6rem;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BlockSpan = styled.p`
    text-align: center;
    font-size: 2rem;
`;

export default Game;