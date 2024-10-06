import React from "react";
import useVerbiage from "../Amt-library/Custom Hooks/useVerbiage";

const NotFound = () => {
  const { getVerbiage } = useVerbiage(
    "20GNjHG693sKUTzxMCGFS0MCd0uZ2MeoNEx6knvvCj26x3Zh0W"
  );
  return <div>{getVerbiage("not_found_message")}</div>;
};

export default NotFound;
