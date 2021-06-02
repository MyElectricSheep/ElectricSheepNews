import React, { useRef, useEffect, useState } from "react";

const RefreshCounter = ({ page, search }) => {
  const [counter, setCounter] = useState(10);
  const timer = useRef(undefined);

  const handleResetTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setCounter(30);
  };

  useEffect(() => {
    handleResetTimer();
  }, [page, search]);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else if (counter === 0 && timer.current) {
      handleResetTimer();
    }
  }, [counter]);

  return (
    <div className="fixed bottom-0 right-8 sm:right-16 md:right-32 xl:right-1/2 opacity-30 text-hacker-dark text-sm">
      Next update in: {counter}s
    </div>
  );
};

export default RefreshCounter;
