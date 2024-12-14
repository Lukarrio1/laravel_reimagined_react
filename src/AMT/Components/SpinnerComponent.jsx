import React, { memo } from "react";

const SpinnerComponent = ({ text = "", isLoading = false }) => {
  return (
    <>
      {text ? <span>{text}</span> : null}
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : null}
    </>
  );
};
export default SpinnerComponent;
