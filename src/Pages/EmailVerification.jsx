import React, { useEffect } from "react";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import { Constants } from "../AMT/Abstract/Constants";
import useAuthDataLayer from "../AMT/Data-layer/useAuthDataLayer";

const {
  uuids: {
    email_verification_page: { email_verification_page_uuid },
  },
} = Constants;

const styles = {
  welcomeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};

const EmailVerification = () => {
  const { verifyEmail } = useAuthDataLayer();

  useEffect(() => {
    verifyEmail();
  }, []);

  const { getVerbiage } = useVerbiage(email_verification_page_uuid);

  return (
    <div className="container-fluid text-center" style={styles.welcomeSection}>
      <div className="col-sm-6 text-center h4 mt-5">
        <div class="alert alert-warning" role="alert">
          {getVerbiage("title")}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
