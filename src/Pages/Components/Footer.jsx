import React from "react";
import PermissionWrapper from "../../Laravel _Reimagined_Library/Wrappers/PermissionWrapper";
import useVerbiage from "../../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import useSettings from "../../Laravel _Reimagined_Library/Custom Hooks/useSettings";

const Footer = () => {
  const { getVerbiage } = useVerbiage(
    "cUHq5K7gFKAwgX6qsJx0mGnnpTnap70ljk3VGpTfNsPf7ZLXYM"
  );
  const { getSetting } = useSettings();
  return (
    <PermissionWrapper
      uuid={"cUHq5K7gFKAwgX6qsJx0mGnnpTnap70ljk3VGpTfNsPf7ZLXYM"}
    >
      <footer
        className="bg-white fixed-bottom"
        style={{
          zIndex: 1030,
        }}
      >
        <div className="container text-center py-3">
          <span>
            {getVerbiage("version_text", {
              app_version: getSetting("app_version"),
            })}
          </span>
        </div>
      </footer>
    </PermissionWrapper>
  );
};

export default Footer;
