import React, { useEffect, useLayoutEffect } from "react";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import { Constants } from "../../AMT/Abstract/Constants";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import Link from "../../AMT/Components/Link";
import SpinnerComponent from "../../AMT/Components/SpinnerComponent";

const {
  uuids: {
    auth_uuids: { password_reset_email_page_uuid, login_page_link_uuid },
  },
} = Constants;

export default function PasswordResetEmail() {
  const { setProperties, Html, clearError, value: emailValue } = useInput();
  const { getVerbiage } = useVerbiage(password_reset_email_page_uuid);
  const { sendPasswordResetEmail, sendingPasswordResetEmail } =
    useAuthDataLayer();

  useLayoutEffect(() => {
    setProperties({
      name: "email",
      className: "form-control",
      id: "email-input",
      type: "text",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "email_field_label",
          uuid: password_reset_email_page_uuid,
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
              {getVerbiage("email_form_title")}
            </div>
            <div className="card-body">
              <div className="form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    clearError();
                    sendPasswordResetEmail({ email: emailValue });
                  }}
                >
                  <div className="mb-3">{Html}</div>
                  <div className="mb-3">
                    <div className="text-center">
                      <button className="btn btn-sm btn-primary" type="submit">
                        <SpinnerComponent
                          text={getVerbiage("password_email_send_btn")}
                          isLoading={sendingPasswordResetEmail()}
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
