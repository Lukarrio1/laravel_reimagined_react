import React from "react";
import { useDispatch } from "react-redux";
import Link from "../../AMT/Components/Link";
import PermissionWrapper from "../../AMT/Wrappers/PermissionWrapper";
import { logout } from "../../AMT/Stores/auth";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import useSettings from "../../AMT/Custom Hooks/useSettings";
import { Constants } from "../../AMT/Abstract/Constants";
import usePostDataLayer from "../../AMT/Data-layer/usePostDataLayer";
const {
  uuids: {
    auth_uuids: {
      logout_component_uuid,
      register_page_link_uuid,
      login_page_link_uuid,
    },
    home_page: { home_page_link_uuid },
    blog: { create_post_page_link_uuid, post_page_link_uuid },
  },
} = Constants;

export default function Navbar() {
  const { getSetting } = useSettings();
  const { getVerbiage: getLogoutVerbiage } = useVerbiage(logout_component_uuid);
  const dispatch = useDispatch();
  const {
    getPosts,
    fetchedData: { fetchedPosts },
  } = usePostDataLayer();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <Link
          uuid={home_page_link_uuid}
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
              uuid={register_page_link_uuid}
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
              uuid={login_page_link_uuid}
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
            <Link
              uuid={create_post_page_link_uuid}
              className="nav-link"
              enable_verbiage={{
                enable: true,
                verbiage_key: "text",
                verbiage_properties: {},
                addPrefixOrSuffix: [],
              }}
            ></Link>
          </li>
          <li className="nav-item">
            <Link
              // prefetch={() => (fetchedPosts.length == 0 ? getPosts() : null)}
              uuid={post_page_link_uuid}
              className="nav-link"
              enable_verbiage={{
                enable: true,
                verbiage_key: "text",
                verbiage_properties: {},
                addPrefixOrSuffix: [],
              }}
            ></Link>
          </li>
          <li className="nav-item">
            <PermissionWrapper uuid={logout_component_uuid}>
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
