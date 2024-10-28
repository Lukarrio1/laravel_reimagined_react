import React from "react";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import useSettings from "../AMT/Custom Hooks/useSettings";
import { Constants } from "../AMT/Abstract/Constants";

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
const {
  uuids: {
    system_uuids: { no_permission_component_uuid },
  },
} = Constants;

const NoPermission = ({ className, Node }) => {
  const { getSetting } = useSettings();
  const { getVerbiage } = useVerbiage(no_permission_component_uuid);

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
};
export default NoPermission;
