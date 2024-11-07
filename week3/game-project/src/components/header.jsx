import styled from "@emotion/styled";

const Header = ({ timer, gameLevel, setGameLevel, resetTimer, onGameButtonClick, onRankingButtonClick, onResetRanking }) => {
    const handleLevelChange = (event) => {
        const newLevel = Number(event.target.value);
        setGameLevel(newLevel);
        resetTimer(); // 타이머 초기화
    }

    return (
        <Nav>
            <Title>1 to 50</Title>
            <GameButton onClick={onGameButtonClick}>게임</GameButton>
            <GameRanking onClick={onRankingButtonClick}>랭킹</GameRanking>
            {onResetRanking && (
            <ResetButton onClick={onResetRanking}>초기화</ResetButton>
            )}
             {!onResetRanking && (
        <>
          <GameStage value={gameLevel} onChange={handleLevelChange}>
            <LevelOne value={1}>Level 1</LevelOne>
            <LevelTwo value={2}>Level 2</LevelTwo>
            <LevelThree value={3}>Level 3</LevelThree>
          </GameStage>
          <StopWatch>소요 시간: {timer.toFixed(2)}초</StopWatch>
        </> )}
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
`;

const Title = styled.h1`
    margin-left: 5rem;
`;

const GameButton = styled.button`
    background-color: #ECDFCC;
    border-radius: 10%;
`;

const GameRanking = styled.button`
    background-color: #ECDFCC;
    border-radius: 10%;
`;

const GameStage = styled.select`
    margin-left: auto;
    background-color: #ECDFCC;
    border-radius: 10%;
`;

const LevelOne = styled.option``;

const LevelTwo = styled.option``;

const LevelThree = styled.option``;

const StopWatch = styled.div`
    width: 8rem;
    margin-right: 1rem;
`;
const ResetButton = styled.button`
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: #ff1111;
  }
`;

export default Header;
