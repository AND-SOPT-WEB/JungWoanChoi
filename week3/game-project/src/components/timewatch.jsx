// Timer.jsx
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

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
        <TimeWatch>
            시간: {time.toFixed(2)}초
        </TimeWatch>
    );
};

const TimeWatch = styled.div`
margin-right: 1rem;
`

export default Timer;