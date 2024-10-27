import React from "react";

export default function ButtonSpinnerComponent({
  text = "",
  isLoading = false,
}) {
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
}
