import React, { useLayoutEffect } from "react";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import ButtonSpinnerComponent from "../../AMT/Components/ButtonSpinnerComponent";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import { Constants } from "../../AMT/Abstract/Constants";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
const {
  uuids: {
    auth_uuids: { password_reset_page_uuid },
  },
} = Constants;
export default function PasswordReset() {
  const { setProperties: passwordInput, Html: passwordHtml } = useInput();
  const { setProperties: confirmPasswordInput, Html: confirmPasswordHtml } =
    useInput();
  const { getVerbiage } = useVerbiage();
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
              Password Reset
            </div>
            <div className="card-body">
              <div className="form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mb-3">{passwordHtml}</div>
                  <div className="mb-3">{confirmPasswordHtml}</div>
                  <div className="mb-3">
                    <div className="text-center">
                      <button className="btn btn-sm btn-primary" type="submit">
                        <ButtonSpinnerComponent
                          text={"update password"}
                          isLoading={false}
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
