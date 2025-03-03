import React from "react";
export default function Refresh({
  isDataFresh = true,
  onRefreshCallback = () => null,
}) {
  return !isDataFresh ? (
    <button
      className="btn btn-default btn-lg"
      onClick={() => onRefreshCallback()}
    >
      <i className="bi bi-arrow-clockwise"></i>
    </button>
  ) : null;
}
