import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRest from "../AMT/Custom Hooks/useRest";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import useNavigator from "../AMT/Custom Hooks/useNavigator";
import { Constants } from "../AMT/Abstract/Constants";

const {
  uuids: {
    home_page: { home_page_link_uuid },
    email_verification_page: {
      email_verification_endpoint_uuid,
      email_verification_page_uuid,
    },
  },
} = Constants;

const EmailVerification = () => {
  const styles = {
    welcomeSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  };

  const { token } = useParams();

  const { restClient } = useRest();

  const { node } = useNavigator(home_page_link_uuid);

  const verifyEmail = async () => {
    const { data } = await restClient(email_verification_endpoint_uuid, {
      token: token,
    });
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = node?.node_route;
  };

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
