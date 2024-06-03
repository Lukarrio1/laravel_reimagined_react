import React from "react";
import Link from "../Laravel _Reimagined_Library/Link";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#dc3545",
  },
  message: {
    fontSize: "1.2rem",
    color: "#6c757d",
  },
};

export default function NoPermission({ link_uuid }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Permission Required</h1>
      <p style={styles.message}>
        You do not have the necessary permissions to access this page. <br />
        Please contact your administrator or visit{" "}
        <Link uuid={link_uuid} className="btn btn-sm btn-default"></Link>.
      </p>
    </div>
  );
}
