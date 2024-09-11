import React from "react";

import { useSelector } from "react-redux";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";

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

export default function NoPermission({ className, Node }) {
  const { getSetting } = useSettings();
  
  const { getVerbiage } = useVerbiage(
    "Ozmr5U5M7Wvd1FBiU4oIi1ZHhCKIrkiQNGFjbZofuo9oiqLbJQ"
  );

  return (
    <div className={className}>
      <div className="col-md-auto m-4">
        <div className="card text-center">
          <div className="card-header bg-warning text-dark">
            <h4>{getVerbiage("title")}</h4>
          </div>
          <div className="card-body">
            <p className="card-text" style={styles.message}>
              {getVerbiage("first_message", {
                component_name: Node?.name,
              })}
              <br />
              {getVerbiage("second_message", {
                site_email: getSetting("site_email_address"),
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
