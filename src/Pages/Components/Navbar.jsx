import React from "react";
import { useDispatch } from "react-redux";
import Link from "../../AMT/Components/Link";
import PermissionWrapper from "../../AMT/Wrappers/PermissionWrapper";
import { logout } from "../../AMT/Stores/auth";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import useSettings from "../../AMT/Custom Hooks/useSettings";

export default function Navbar() {
  const { getSetting } = useSettings();
  const { getVerbiage: getLogoutVerbiage } = useVerbiage(
    "YiNfpDugNwyu1yTlOsGGvPAj2YZpoitcuEgEGphxrQxcK1HT0t"
  );

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <Link
          uuid={"nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"}
          className="nav-link"
          enable_verbiage={{
            enable: true,
            verbiage_key: "home_nav_text",
            verbiage_properties: {
              app_name: getSetting("client_app_name"),
              app_version: getSetting("app_version"),
            },
          }}
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
              enable_verbiage={{
                enable: true,
                verbiage_key: "register_nav_text",
                verbiage_properties: {},
                addPrefixOrSuffix: [],
              }}
            ></Link>
          </li>
          <li className="nav-item">
            <Link
              uuid={"K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"}
              className="nav-link"
              enable_verbiage={{
                enable: true,
                verbiage_key: "login_nav_text",
                verbiage_properties: {},
                addPrefixOrSuffix: [],
              }}
            ></Link>
          </li>
          <li className="nav-item">
            <PermissionWrapper
              uuid={"YiNfpDugNwyu1yTlOsGGvPAj2YZpoitcuEgEGphxrQxcK1HT0t"}
            >
              <a
                href={getSetting("redirect_to_after_logout")}
                onClick={() => {
                  dispatch(logout());
                }}
                className="nav-link"
              >
                {getLogoutVerbiage("logout_button")}
              </a>
            </PermissionWrapper>
          </li>
        </ul>
      </div>
    </nav>
  );
}
