import { useState } from 'react';
import Header from './components/header.jsx';
import Game from './components/game.jsx';
import Ranking from "./components/ranking.jsx";


// everyData 삭제하면 오류 뜨는 것 고치기

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  const [updateRanking, setUpdateRanking] = useState(false);

  const initializeGameData = () => {
    if (!localStorage.getItem("gameData")) {
      localStorage.setItem("gameData", JSON.stringify([]));
    }
  };

  // 게임 시작
  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsTimerActive(true);
  };

  // 게임 종료
  const handleGameEnd = () => {
    setIsGameStarted(false);
    setIsTimerActive(false);

    // 게임 결과 로컬 스토리지에 저장
    const timeNow = new Date().toISOString();
    const playTime = timer;
    const everyData= JSON.parse(localStorage.getItem("gameData")) || [];
    const newGameData = {
      timeNow, 
      gameLevel,
      playTime
    };
    
    everyData.push(newGameData);
    localStorage.setItem("gameData", JSON.stringify(everyData));
    setTimer(0); // 타이머 초기화 

    setUpdateRanking(prev => !prev);
  };

  return (
    <>
      <Header timer={timer} />
      <Game 
        isGameStarted={isGameStarted} 
        onGameStart={handleGameStart} 
        onGameEnd={handleGameEnd}
        setTimer={setTimer}
      />
      <Ranking updateRanking={updateRanking} />
    </>
  );
}

export default App;