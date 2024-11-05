import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import useTimer from "./timer.jsx"; // 타이머 기능의 커스텀 훅

const Game = ({ isGameStarted, onGameStart, onGameEnd, setTimer }) => {
    const [blocks, setBlocks] = useState([]);
    const [nextNumber, setNextNumber] = useState(1);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [timer, resetTimer] = useTimer(isGameStarted); // 타이머와 타이머 초기화 함수

    useEffect(() => {
        initializeGame();
    }, []); 

    useEffect(() => {
        setTimer(timer);
    }, [timer, setTimer]);

    const initializeGame = () => {
        const initialNumbers = Array.from({length: 9}, (_, index) => index + 1);
        const shuffledInitialNumbers = shuffleArray(initialNumbers);
        setBlocks(shuffledInitialNumbers);
        setNextNumber(1);
        setAvailableNumbers(shuffleArray(Array.from({length: 9}, (_, index) => index + 10)));
        resetTimer();
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
        }

        if (num === nextNumber) {
            const newBlocks = blocks.map((block) => 
                block === num ? availableNumbers.shift() : block
            );

            setBlocks(newBlocks);
            setNextNumber(nextNumber + 1);

            if (num === 18) { 
                alert(`게임이 종료되었습니다! 총 시간: ${timer.toFixed(2)} 초`);
                onGameEnd(); // 게임 종료
                initializeGame();
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
