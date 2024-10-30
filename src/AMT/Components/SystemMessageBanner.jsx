import React, { useEffect } from "react";
import useSystemMessage from "../Custom Hooks/useSystemMessage";

export default function SystemMessageBanner() {
  const { getMessage, clearMessage } = useSystemMessage();

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearMessage();
    }, 5000);
    if (getMessage()) {
      return () => clearTimeout(timeout);
    }
  }, [getMessage()]);
  return (
    <div className="row">
      <div className="col-sm-12 text-center h3">{getMessage()}</div>
    </div>
  );
}
