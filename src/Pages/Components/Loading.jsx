import React from "react";
const styles = {
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};
export default function Loading({ textElement = null }) {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!textElement ? (
          <div
            className="spinner-border"
            role="status"
            style={{
              width: "10rem",
              height: "10rem",
              borderWidth: "0.4em",
            }}
          >
            {/* {getVerbiage("loading_animation_element")}{" "} */}
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          textElement
        )}
      </div>
    </div>
  );
}
