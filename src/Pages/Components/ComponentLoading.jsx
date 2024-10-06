import React, { useState } from "react";

const ComponentLoading = () => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);

    // Simulate an async operation (e.g., an API call)
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Hide the loader after 3 seconds
  };

  const loaderOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1050,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loaderStyle = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div>
      {loading && (
        <div style={loaderOverlayStyle}>
          <div style={loaderStyle}></div>
        </div>
      )}
      <div className="container mt-5">
        <h1>Page Content Here</h1>
        <button className="btn btn-primary" onClick={showLoader}>
          Show Loader
        </button>
      </div>
    </div>
  );
};

export default ComponentLoading;
