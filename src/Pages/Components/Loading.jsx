import React from "react";
import useVerbiage from "../../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
const styles = {
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
};
export default function Loading() {
  const { getVerbiage } = useVerbiage(
    "PL26qXGSDPYbjVvaxbL7k9kZWcOXn7skFgSdph1S9h8wQmSfWt"
  );
  return (
    <div>
      <div className="container-fluid text-center" style={styles.loading}>
        {getVerbiage("loading_animation_element")}
      </div>
    </div>
  );
}
