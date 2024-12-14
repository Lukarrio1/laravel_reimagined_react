import React, { useLayoutEffect } from "react";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import { Constants } from "../../AMT/Abstract/Constants";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";
import Link from "../../AMT/Components/Link";
import SpinnerComponent from "../../AMT/Components/SpinnerComponent";
const {
  uuids: {
    auth_uuids: { password_reset_page_uuid, login_page_link_uuid },
  },
} = Constants;
export default function PasswordReset() {
  const {
    setProperties: passwordInput,
    Html: passwordHtml,
    value: passwordValue,
  } = useInput();
  const {
    setProperties: confirmPasswordInput,
    Html: confirmPasswordHtml,
    value: confirmPasswordValue,
  } = useInput();
  const { updateUserPassword, updatingUserPassword } = useAuthDataLayer();

  const { getVerbiage } = useVerbiage(password_reset_page_uuid);

  useLayoutEffect(() => {
    passwordInput({
      name: "password",
      className: "form-control",
      id: "password-input",
      type: "password",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "password_field_label",
          uuid: password_reset_page_uuid,
        },
      },
    });
    confirmPasswordInput({
      name: "confirm_password",
      className: "form-control",
      id: "confirm-password-input",
      type: "password",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "confirm_password_field_label",
          uuid: password_reset_page_uuid,
        },
      },
    });
  }, []);
  return (
    <AnimationWrapper>
      <div className="row mt-5">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-header text-center bg-white">
              {getVerbiage("password_form_title")}
            </div>
            <div className="card-body">
              <div className="form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUserPassword({
                      password: passwordValue,
                      confirm_password: confirmPasswordValue,
                    });
                  }}
                >
                  <div className="mb-3">{passwordHtml}</div>
                  <div className="mb-3">{confirmPasswordHtml}</div>
                  <div className="mb-3">
                    <div className="text-center">
                      <button className="btn btn-sm btn-primary" type="submit">
                        <SpinnerComponent
                          text={getVerbiage("password_reset_form_btn")}
                          isLoading={updatingUserPassword()}
                        ></SpinnerComponent>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-footer h5 bg-white">
              or{" "}
              <Link
                uuid={login_page_link_uuid}
                enable_verbiage={{
                  enable: true,
                  flat_value: true,
                  verbiage_key: "login_nav_text",
                  verbiage_properties: {},
                  addPrefixOrSuffix: [],
                }}
                className="btn btn-sm btn-default"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
