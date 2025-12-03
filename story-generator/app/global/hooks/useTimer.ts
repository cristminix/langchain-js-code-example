import { useEffect, useRef, useState } from "react";

export function useTimer(isLoading: boolean, initialTime = 1, interval = 1000) {
  const [elapsedTime, setElapsedTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Reset timer saat loading dimulai
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setElapsedTime(initialTime);
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, interval);
    } else {
      // Clear interval saat loading selesai
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoading, initialTime, interval]);

  return elapsedTime;
}
