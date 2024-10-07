import React from "react";
import PermissionWrapper from "../AMT/Wrappers/PermissionWrapper";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import AnimationWrapper from "../AMT/Wrappers/AnimationWrapper";
import useSettings from "../AMT/Custom Hooks/useSettings";
import useAuthUser from "../AMT/Custom Hooks/useAuthUser";

const styles = {
  welcomeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};
const Home = () => {
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
        {/* <ComponentLoading></ComponentLoading> */}
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
