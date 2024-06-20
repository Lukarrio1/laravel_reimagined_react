import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import { logout } from "../Laravel _Reimagined_Library/React Base Stores/auth";
import PermissionWrapper from "../Laravel _Reimagined_Library/Wrappers/PermissionWrapper";
import useNavigator from "../Laravel _Reimagined_Library/Custom Hooks/useNavigator";
import { setUpNodes } from "../Laravel _Reimagined_Library/Abstract/AppStructure";

export default function Navbar() {
  const { app_name, redirect_to_after_logout } = useSelector((state) => {
    return {
      app_name: state?.setting?.settings?.app_name?.value,
      redirect_to_after_logout:
        state?.setting?.settings?.redirect_to_after_logout,
    };
  });

  const dispatch = useDispatch();
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
          <li className="nav-item">
            <PermissionWrapper
              uuid={"YiNfpDugNwyu1yTlOsGGvPAj2YZpoitcuEgEGphxrQxcK1HT0t"}
            >
              <a
                href={redirect_to_after_logout?.value}
                onClick={() => {
                  dispatch(logout());
                  // setUpNodes(
                  //   "0zFz4RFZqQXIggfj4fbMhWnCCiM4qThLyhbGYpumdo3xkAdB2H",
                  //   dispatch
                  // );
                  // LoginPageLink.setNavProperties({ ready: true });
                }}
                className="nav-link"
              >
                Logout
              </a>
            </PermissionWrapper>
          </li>
        </ul>
      </div>
    </nav>
  );
}
