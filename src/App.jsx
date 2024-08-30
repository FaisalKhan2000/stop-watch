import { useEffect, useRef, useState } from "react";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const isMounted = useRef(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        if (isMounted.current) {
          setSeconds((prev) => prev + 1);
        }
      }, 1000);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 stopwatch-container">
      <div className="text-center">
        <div className="display-1 stopwatch-timer mb-4">
          {Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :{(seconds % 60).toString().padStart(2, "0")}
        </div>
        <div
          className="btn-group d-flex justify-content-center mb-4"
          role="group"
        >
          <button
            className="btn btn-custom mx-2"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="btn btn-custom mx-2"
            onClick={pauseTimer}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button className="btn btn-custom mx-2" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
