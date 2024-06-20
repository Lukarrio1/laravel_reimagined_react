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
export default function Loading() {
  return (
    <div>
      <div
        className="container-fluid text-center"
        style={styles.loading}
      >
        <h1>
          <div class="spinner-border text-info" style={{fontSize:'200px'}} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </h1>
      </div>
    </div>
  );
}
