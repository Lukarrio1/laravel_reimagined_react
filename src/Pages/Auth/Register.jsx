import React, { useEffect, useState } from "react";
import Link from "../../AMT/Components/Link";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";

const Register = () => {
  const { getVerbiage } = useVerbiage(
    "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP"
  );
  const { register, getIsLoading, uuids } = useAuthDataLayer();

  const [creds, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });

  const {
    setProperties: setNameProperties,
    value: name,
    Html: NameHtml,
    clearError: clearNameError,
  } = useInput();

  const {
    setProperties: setEmailProperties,
    value: email,
    Html: EmailHtml,
    clearError: clearEmailError,
  } = useInput();

  const {
    setProperties: setPasswordProperties,
    value: password,
    Html: PasswordHtml,
    clearError: clearPasswordError,
  } = useInput();

  const {
    setProperties: setConfirmPasswordProperties,
    value: confirm_password,
    Html: ConfirmPasswordHtml,
    clearError: clearConFirmPasswordError,
  } = useInput();

  useEffect(() => {
    setNameProperties({
      name: "name",
      className: "form-control",
      id: "name-input",
      type: "text",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "full_name_field_title",
          uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
        },
      },
    });
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
          uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
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
          uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
        },
      },
    });
    setConfirmPasswordProperties({
      name: "confirm_password",
      type: "password",
      className: "form-control",
      id: "confirm_password-input",
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "confirm_password_field_title",
          uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
        },
      },
    });
  }, []);

  useEffect(() => {
    setCredentials({
      ...creds,
      name,
      email,
      password,
      confirm_password,
    });
  }, [name, email, password, confirm_password]);

  const clearAllErrors = () => {
    clearNameError();
    clearEmailError();
    clearPasswordError();
    clearConFirmPasswordError();
  };

  return (
    <AnimationWrapper>
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card">
            <div className="card-header text-center h4 bg-white">
              {getVerbiage("title")}
            </div>

            <div className="card-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  clearAllErrors();
                  register({ ...creds });
                }}
              >
                <div className="mb-3">{NameHtml}</div>
                <div className="mb-3">{EmailHtml}</div>
                <div className="mb-3">{PasswordHtml}</div>
                <div className="mb-3">{ConfirmPasswordHtml}</div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={getIsLoading(uuids?.register_endpoint)}
                  >
                    {getVerbiage("register_button")}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer h5 bg-white">
              or{" "}
              <Link
                onClick={() => {
                  clearAllErrors();
                }}
                uuid={"K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"}
                enable_verbiage={{
                  enable: true,
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
};
export default Register;
