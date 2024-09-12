import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import useNavigator from "../Laravel _Reimagined_Library/Custom Hooks/useNavigator";

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

  const { node } = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );

  const verifyEmail = async () => {
    const { data } = await restClient(
      "napwAbGlLIs2owgXvRr9bF8C84SlmhaYy2QMwIclCT9ddM5qZU",
      { token: token }
    );
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = node?.node_route;
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  const { getVerbiage } = useVerbiage(
    "so2HDQJPD7rZlNL66ifHff0mt5ymXRyOmxE0hPsJt5x2xiDcV4"
  );

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
