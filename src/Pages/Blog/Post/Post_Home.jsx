import React from "react";
import useVerbiage from "../../../AMT/Custom Hooks/useVerbiage";

export default function Post_Home() {
  const { getVerbiage } = useVerbiage(
    "7X2H8SYfJLdfX33vjr9K6NKI5jCBzim2hjcfHgB2CtolmlAzVh"
  );
  return <div>{getVerbiage("title", { foo: "Bar" })}</div>;
}
