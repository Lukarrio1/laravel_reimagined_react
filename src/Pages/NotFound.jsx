import React from "react";
import useVerbiage from "../AMT/Custom Hooks/useVerbiage";
import { Constants } from "../AMT/Abstract/Constants";
const {
  uuids: {
    system_uuids: { not_found_page_uuid },
  },
} = Constants;

const NotFound = () => {
  const { getVerbiage } = useVerbiage(not_found_page_uuid);
  return <div>{getVerbiage("not_found_message")}</div>;
};

export default NotFound;
