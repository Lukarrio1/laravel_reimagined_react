import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent black background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensures the overlay is above other elements
      }}
    >
      <div
        className="h1 text-center text-bold"
        style={{ fontSize: "100px", color: "#fff" }}
      >
        <span className="dots"></span> {/* Add animation if needed */}
      </div>
    </div>
  );
}
