import React from "react";
import PermissionWrapper from "../../AMT/Wrappers/PermissionWrapper";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import useSettings from "../../AMT/Custom Hooks/useSettings";
import { Constants } from "../../AMT/Abstract/Constants";
const {
  uuids: {
    system_uuids: { footer_component_uuid },
  },
} = Constants;

const Footer = () => {
  const { getVerbiage } = useVerbiage(footer_component_uuid);
  const { getSetting } = useSettings();
  return (
    <PermissionWrapper uuid={footer_component_uuid}>
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
