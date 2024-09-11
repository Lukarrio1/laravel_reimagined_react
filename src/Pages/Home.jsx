import React, { useEffect, useState } from "react";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PermissionWrapper from "../Laravel _Reimagined_Library/Wrappers/PermissionWrapper";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useAuthUser from "../Laravel _Reimagined_Library/Custom Hooks/useAuthUser";
import useNavigator from "../Laravel _Reimagined_Library/Custom Hooks/useNavigator";

const Home = ({ search_skip_word }) => {
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
          <h1>{getVerbiage("title", { app_name: getSetting("app_name") })}</h1>
          <p className="lead">
            {getVerbiage("welcome_message", { user_name: user?.name })}
          </p>
        </PermissionWrapper>
      </div>
    </AnimationWrapper>
  );
};
export default Home;
