import React from "react";
import Link from "../Laravel _Reimagined_Library/Link";
import { useSelector } from 'react-redux'

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

export default function NoPermission({ link_uuid, className, Node }) {
  const { site_email_address } = useSelector((state) => {
    return {
      site_email_address: state?.setting?.settings?.site_email_address?.value,
    };
  });
  return (
    <div className={className}>
      <div className="col-md-auto m-4">
        <div className="card text-center">
          <div className="card-header bg-warning text-dark">
            <h4>Permission Required</h4>
          </div>
          <div className="card-body">
            <p className="card-text" style={styles.message}>
              You do not have the necessary permissions to access{" "}
              <strong>{Node?.name ?? "this page"}</strong>
              <br />
              Please contact your administrator at ({site_email_address}){" "}
              {link_uuid && `or visit  `}
              {link_uuid && (
                <Link
                  uuid={link_uuid}
                  className="btn btn-sm btn-default"
                ></Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
