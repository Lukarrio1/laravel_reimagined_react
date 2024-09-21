import React, { useEffect } from "react";
import PermissionWrapper from "../Laravel _Reimagined_Library/Wrappers/PermissionWrapper";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useAuthUser from "../Laravel _Reimagined_Library/Custom Hooks/useAuthUser";

const Home = () => {
  const styles = {
    welcomeSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  };
  const user = useAuthUser();

  const { getVerbiage } = useVerbiage(
    "kmg9uKHV1VR9eoF1mdl3nahG8CCpSduNdL55C26uvwG6c9ldsH"
  );

  const { getSetting } = useSettings();

  return (
    <AnimationWrapper>
      <div
        className="container-fluid text-center"
        style={styles.welcomeSection}
      >
        <PermissionWrapper
          uuid={"IYUhLzLdfYToLMg4YY46dxsXVvIwA90fLLew0vOoFXbBnrfn51"}
        >
          <h1>
            {getVerbiage("title", { app_name: getSetting("client_app_name") })}
          </h1>
          <p className="lead">
            {getVerbiage("welcome_message", { user_name: user?.name })}
          </p>
        </PermissionWrapper>
      </div>
    </AnimationWrapper>
  );
};
export default Home;
