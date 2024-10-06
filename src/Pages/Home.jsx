import React, { useEffect, useState } from "react";
import PermissionWrapper from "../Amt-library/Wrappers/PermissionWrapper";
import useVerbiage from "../Amt-library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Amt-library/Wrappers/AnimationWrapper";
import useSettings from "../Amt-library/Custom Hooks/useSettings";
import useAuthUser from "../Amt-library/Custom Hooks/useAuthUser";
import useTable from "../Amt-library/Custom Hooks/Html/useTable";
import useRest from "../Amt-library/Custom Hooks/useRest";
import ComponentLoading from "./Components/ComponentLoading";
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
