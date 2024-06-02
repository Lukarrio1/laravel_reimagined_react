import React from "react";
import { useSelector } from "react-redux";
import Link from "../Laravel _Reimagined_Library/Link";

export default function Navbar() {
  const { app_name } = useSelector((state) => {
    return {
      app_name: state?.setting?.settings?.app_name,
    };
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <Link
          uuid={"nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"}
          className="nav-link"
          text={app_name ?? ""}
        ></Link>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              uuid={"FJisFM6Ur8GMDW5PDjM2lLO9KIzyW9LhRNGLGBwS6vxCI38Q7B"}
              className="nav-link"
            ></Link>
          </li>
          <li className="nav-item">
            <Link
              uuid={"K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"}
              className="nav-link"
            ></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
