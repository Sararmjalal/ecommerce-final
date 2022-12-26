import React, {useState, useEffect} from "react";

const Timer = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(190);

  useEffect(() => {
    if (timeLeft === 0) {
      setStep(1);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      {timeLeft < 20 && (
        <div>
          {timeLeft === 1 ? (
            <p className='text-xs text-center text-reddish font-bold mb-2 mt-4'>
              Time's up! Try Again ...
            </p>
          ) : (
            <p className='text-xs text-center text-reddish font-semibold mb-2 mt-4'>
              Time left:{" "}
              <span className='font-bold text-sm text-black'>{timeLeft}</span>{" "}
              seconds
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Timer;
