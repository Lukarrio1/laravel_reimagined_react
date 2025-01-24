import React, { useEffect, useState } from "react";
import Link from "../../AMT/Components/Link";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useErrors from "../../AMT/Custom Hooks/useErrors";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";
import { Constants } from "../../AMT/Abstract/Constants";
import SpinnerComponent from "../../AMT/Components/SpinnerComponent";

const {
  uuids: {
    auth_uuids: {
      login_page_uuid,
      register_page_link_uuid,
      password_reset_email_link_uuid,
    },
  },
} = Constants;

const Login = () => {
  const { login, signing } = useAuthDataLayer();
  const { getVerbiage } = useVerbiage(login_page_uuid);

  const { clearError, getError } = useErrors();

  const {
    setProperties: setEmailProperties,
    value: email,
    Html: EmailHtml,
  } = useInput();

  const {
    setProperties: setPasswordProperties,
    value: password,
    Html: PasswordHtml,
  } = useInput();

  useEffect(() => {
    setEmailProperties({
      name: "email",
      type: "email",
      className: "form-control",
      id: "email-input",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "email_field_title",
          uuid: login_page_uuid,
        },
      },
    });
    setPasswordProperties({
      name: "password",
      type: "password",
      className: "form-control",
      id: "password-input",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "password_field_title",
          uuid: login_page_uuid,
        },
      },
    });
  }, []);

  return (
    <AnimationWrapper>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card">
            <div className="card-header text-center h4 bg-white">
              {getVerbiage("title")}
            </div>
            <div className="card-body">
              <div className="text-center text-danger">
                {getError("invalid_credentials")}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  clearError();
                  login({ password, email });
                }}
              >
                <div className="mb-3">{EmailHtml}</div>
                <div className="mb-3">{PasswordHtml}</div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={signing()}
                  >
                    <SpinnerComponent
                      text={getVerbiage("login_button")}
                      isLoading={signing()}
                    ></SpinnerComponent>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer h5 bg-white">
              or{" "}
              <Link
                uuid={register_page_link_uuid}
                className="btn btn-sm btn-default"
                enable_verbiage={{
                  enable: true,
                  flat_value: true,
                  verbiage_key: "register_nav_text",
                  verbiage_properties: {},
                  addPrefixOrSuffix: [],
                }}
              ></Link>{" "}
              <Link
                uuid={password_reset_email_link_uuid}
                className="btn btn-sm btn-default"
                enable_verbiage={{
                  enable: true,
                  flat_value: true,
                  verbiage_key: "password_reset_nav_text",
                  verbiage_properties: {},
                  addPrefixOrSuffix: [],
                }}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};
export default Login;
