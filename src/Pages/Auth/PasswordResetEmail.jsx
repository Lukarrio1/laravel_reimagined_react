import React, { useEffect, useLayoutEffect } from "react";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import { Constants } from "../../AMT/Abstract/Constants";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import ButtonSpinnerComponent from "../../AMT/Components/ButtonSpinnerComponent";
import useSystemMessage from "../../AMT/Custom Hooks/useSystemMessage";

const {
  uuids: {
    auth_uuids: { password_reset_email_page_uuid },
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
    return () => clearError();
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
                        <ButtonSpinnerComponent
                          text={getVerbiage("password_email_send_btn")}
                          isLoading={sendingPasswordResetEmail()}
                        ></ButtonSpinnerComponent>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-footer">this is the footer</div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
