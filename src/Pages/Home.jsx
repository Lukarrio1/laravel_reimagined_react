import React, { useEffect, useState } from "react";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PermissionWrapper from "../Laravel _Reimagined_Library/Wrappers/PermissionWrapper";

const Home = ({ animation_class }) => {
  const styles = {
    welcomeSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  };

  const { user, app_name } = useSelector((state) => {
    return {
      user: state?.authentication?.user,
      app_name: state?.setting?.settings?.app_name?.value,
    };
  });

  return (
    <div className={animation_class}>
      <div
        className="container-fluid text-center"
        style={styles.welcomeSection}
      >
        <PermissionWrapper
          uuid={"IYUhLzLdfYToLMg4YY46dxsXVvIwA90fLLew0vOoFXbBnrfn51"}
        >
          <h1>Welcome to {app_name ?? ""}</h1>
          <p className="lead">We are happy to see you {user?.name}.</p>
        </PermissionWrapper>
      </div>
    </div>
  );
};
export default Home;
