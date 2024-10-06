import React from "react";
import useErrors from "../../Amt-library/Custom Hooks/useErrors";

export default function SystemErrorMessageBanner() {
  const { getError } = useErrors();

  return (
    <div className="row">
      <div className="col-sm-12 text-center">
        {getError("system_errors")?.map((error) => {
          return (
            <marquee behavior="" direction="left">
              <p className="text-danger">{error}</p>;
            </marquee>
          );
        })}
      </div>
    </div>
  );
}
