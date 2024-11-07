import { useState, useEffect } from "react";

function useTimer(isActive) {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 0.01);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const resetTimer = () => setTimer(0);
    
    return [timer, resetTimer];
}

export default useTimer;