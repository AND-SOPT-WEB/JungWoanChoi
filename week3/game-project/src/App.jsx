import { useEffect, useState } from 'react';
import Header from './components/header.jsx';
import Game from './components/game.jsx';
import Ranking from "./components/ranking.jsx";
import useTimer from './components/timer.jsx';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  const [updateRanking, setUpdateRanking] = useState(false);
  const [timer, resetTimer] = useTimer(isTimerActive);

  const [isRankingView, setIsRankingView] = useState(false);
  const [isGameView, setIsGameView] = useState(true);

  const initializeGameData = () => {
    if (!localStorage.getItem("gameData")) {
      localStorage.setItem("gameData", JSON.stringify([]));
    }
  };

  useEffect(() => {
    initializeGameData();
  }, []);

  // 게임 시작
  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsTimerActive(true); // 타이머 시작
    resetTimer(); // 타이머 초기화
  };

  // 게임 종료
  const handleGameEnd = () => {
    alert(`게임이 종료되었습니다! 총 시간: ${timer.toFixed(2)} 초`);
    setIsGameStarted(false);
    setIsTimerActive(false); // 타이머 멈춤

    // 게임 결과 로컬 스토리지에 저장
    const date = new Date();

    // 날짜 및 시간 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const timeNow = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
      
    const playTime = timer;
    const everyData = JSON.parse(localStorage.getItem("gameData")) || [];
    const newGameData = {
      timeNow,
      gameLevel,
      playTime
    };

    everyData.push(newGameData);
    localStorage.setItem("gameData", JSON.stringify(everyData));
    resetTimer(); // 타이머 초기화

    setUpdateRanking(prev => !prev);
  };

  // 레벨 변경 핸들러
  const handleLevelChange = (newLevel) => {
    setGameLevel(newLevel);
    setIsGameStarted(false);
    resetTimer();
    setIsTimerActive(false);
  };

  const handleGameButtonClick = () => {
    setIsGameView(true);
    setIsRankingView(false);
  }

  const handleRankingButtonClick = () => {
    setIsGameView(false);
    setIsGameStarted(false);
    setIsTimerActive(false);
    resetTimer();
    setIsRankingView(true);
  };

  const handleResetRanking = () => {
    localStorage.removeItem("gameData");
    setUpdateRanking(prev => !prev);
  };

  return (
    <>
      <Header 
        timer={timer} 
        gameLevel={gameLevel}
        setGameLevel={handleLevelChange}
        onGameEnd={handleGameEnd}
        resetTimer={resetTimer}
        onGameButtonClick={handleGameButtonClick}
        onRankingButtonClick={handleRankingButtonClick} 
        onResetRanking={isRankingView ? handleResetRanking : null}
      />
      {isGameView && (
      <Game 
        isGameStarted={isGameStarted} 
        onGameStart={handleGameStart} 
        onGameEnd={handleGameEnd}
        gameLevel={gameLevel}
        resetTimer={resetTimer}
      />
    )}
    {isRankingView && (
      <Ranking updateRanking={updateRanking} />
    )}
    </>
  );
}

export default App;