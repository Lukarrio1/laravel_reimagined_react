import React, { Fragment, memo } from "react";

const ErrorComponent = memo(({ errors = [] }) => {
  return errors?.length > 0
    ? errors?.map((er, index) => (
        <Fragment key={index}>
          <br />
          <div className="text-danger">{er}</div>
        </Fragment>
      ))
    : null;
});

export default ErrorComponent;
