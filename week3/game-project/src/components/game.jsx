import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const Game = () => {
    const [blocks, setBlocks] = useState([]);
    const [nextNumber, setNextNumber] = useState(1);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [timer, setTimer] = useState(0); // 타이머 상태 추가
    const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 상태 추가

    useEffect(() => {
        const initialNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
        const shuffledInitialNumbers = shuffleArray(initialNumbers);
        setBlocks(shuffledInitialNumbers);
        setNextNumber(1);
        setAvailableNumbers(shuffleArray(Array.from({ length: 9 }, (_, index) => index + 10))); // 10~18 랜덤 배열
    }, []);

    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 0.01); // 0.01초씩 증가
            }, 10); // 10ms마다 업데이트
        } else if (!isTimerActive && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleBlockClick = (num) => {
        if (!isGameStarted && num === 1) {
            setIsGameStarted(true);
            setIsTimerActive(true); // 게임 시작 시 타이머 활성화
        }

        if (num === nextNumber) {
            const newBlocks = blocks.map((block) => 
                block === num ? availableNumbers.shift() : block // 현재 숫자를 대체
            );

            setBlocks(newBlocks);
            setNextNumber(nextNumber + 1); // 다음 숫자로 증가

            // 마지막 숫자 체크: 18만 게임 종료 조건으로 사용
            if (num === 18) { 
                alert("게임이 종료되었습니다! 총 시간: " + timer.toFixed(2) + "초");
                resetGame();
            }
        }
    };

    const resetGame = () => {
        setBlocks([]);
        setNextNumber(1);
        setIsGameStarted(false);
        setIsTimerActive(false); // 게임 리셋 시 타이머 비활성화
        setTimer(0); // 타이머 초기화
        setAvailableNumbers(shuffleArray(Array.from({ length: 9 }, (_, index) => index + 10))); // 10~18 랜덤 배열
    };

    return (
        <Section>
            <NextNumber>다음 숫자: {nextNumber}</NextNumber>
            <Timer>소요 시간: {timer.toFixed(2)}초</Timer> {/* 타이머 표시 */}
            <GameDiv>
                {blocks.map((num) => (
                    <Block key={num} onClick={() => handleBlockClick(num)}>
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
margin-top: 2rem`;

const Timer = styled.h2``; // 타이머 스타일 추가

const GameDiv = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
`;

const Block = styled.button`
margin: 0;
padding: 3rem;
`;

const BlockSpan = styled.p`
font-size: 2rem`

export default Game;