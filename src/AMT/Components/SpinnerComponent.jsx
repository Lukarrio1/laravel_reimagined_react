import { useState, useEffect } from "react";
import useSettings from "../Custom Hooks/useSettings";

const SpinnerComponent = ({ text = "", isLoading = false }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { getSetting } = useSettings();

  const ttl = +getSetting("network_request_elapsed_time");

  useEffect(() => {
    let timer;
    if (!ttl) return;
    if (!isLoading) return;
    setElapsedTime(0);
    timer = setInterval(() => {
      const newTTl = ttl / 1000;
      setElapsedTime((prevTime) => prevTime + newTTl);
    }, ttl);
    return () => clearInterval(timer);
  }, [isLoading, ttl]);

  return (
    <>
      {text && <span>{text} </span>}
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {elapsedTime > 0 ? (
            <span className="ms-2">{elapsedTime}s</span>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SpinnerComponent;
