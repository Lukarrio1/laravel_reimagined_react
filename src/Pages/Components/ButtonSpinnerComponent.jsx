import React from "react";

export default function ButtonSpinnerComponent({ text, isLoading }) {
  return (
    <>
      {text}{" "}
      {isLoading && (
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
    </>
  );
}
