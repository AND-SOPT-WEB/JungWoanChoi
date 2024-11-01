// Timer.jsx
import { useState, useEffect } from "react";

const Timer = ({ isGameStarted, isGameEnded }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isGameStarted && !isGameEnded) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 0.01);
            }, 10);
        }
        return () => clearInterval(timer); // Cleanup on unmount
    }, [isGameStarted, isGameEnded]);

    return (
        <div>
            시간: {time.toFixed(2)}초
        </div>
    );
};

export default Timer;