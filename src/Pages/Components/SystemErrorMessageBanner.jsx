import React from "react";
import useErrors from "../../Laravel _Reimagined_Library/Custom Hooks/useErrors";

export default function SystemErrorMessageBanner() {
  const { getError } = useErrors();

  return (
    <div className="row">
      <div className="col-sm-12 text-center">
        {getError("system_errors")?.map((error) => {
          return <p className="text-danger">{error}</p>;
        })}
      </div>
    </div>
  );
}
