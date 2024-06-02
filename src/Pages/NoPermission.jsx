import React from "react";
import Link from "../Laravel _Reimagined_Library/Link";

export default function NoPermission({ link_uuid }) {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100 bg-light text-dark m-4">
      <h1>
        Permission is required please visit{" "}
        <Link uuid={link_uuid}></Link>
      </h1>
    </div>
  );
}
