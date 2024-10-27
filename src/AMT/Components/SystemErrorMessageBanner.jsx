import React, { useEffect } from "react";
import useErrors from "../Custom Hooks/useErrors";
import { useDispatch } from "react-redux";
import { clearErrors } from "../Stores/errors";

export default function SystemErrorMessageBanner() {
  const { getError } = useErrors();
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(clearErrors("system_errors")),
      30
    );
    return () => clearTimeout(timeout);
  }, []);

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
