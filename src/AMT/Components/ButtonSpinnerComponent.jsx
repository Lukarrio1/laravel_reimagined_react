import React, { memo } from "react";

const ButtonSpinnerComponent = memo(({ text = "", isLoading = false }) => {
  return (
    <>
      {text}{" "}
      {isLoading && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
    </>
  );
});
export default ButtonSpinnerComponent;
