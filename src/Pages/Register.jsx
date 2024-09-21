import React, { useEffect, useState } from "react";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useErrors from "../Laravel _Reimagined_Library/Custom Hooks/useErrors";
import useInput from "../Laravel _Reimagined_Library/Custom Hooks/Html/useInput";

const Register = () => {
  const { getVerbiage } = useVerbiage(
    "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP"
  );

  const { getSetting } = useSettings();

  const [creds, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });
  const { restClient } = useRest();

  const register = async () => {
    clearAllErrors();
    const response = await restClient(
      "AdhmjMGkWcgYO9VvTACKum8h1BsYSP1btLfBVajD52KupkOlbC",
      {},
      { ...creds }
    );
    if (response == null) return;
    const { data } = response;
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = getSetting("redirect_to_after_register");
  };

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
      verbiage: {
        key: "full_name_field_title",
        uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
      },
    });
    setEmailProperties({
      name: "email",
      type: "email",
      className: "form-control",
      id: "email-input",
      verbiage: {
        key: "email_field_title",
        uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
      },
    });
    setPasswordProperties({
      name: "password",
      type: "password",
      className: "form-control",
      id: "password-input",
      verbiage: {
        key: "password_field_title",
        uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
      },
    });
    setConfirmPasswordProperties({
      name: "confirm_password",
      type: "password",
      className: "form-control",
      id: "confirm_password-input",
      verbiage: {
        key: "confirm_password_field_title",
        uuid: "0mTYGdLvyQAKwHxiYKyugFNfNOjtPtDAVTexeHWemObldfr5RP",
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
                  register();
                }}
              >
                <div className="mb-3">{NameHtml}</div>
                <div className="mb-3">{EmailHtml}</div>
                <div className="mb-3">{PasswordHtml}</div>
                <div className="mb-3">{ConfirmPasswordHtml}</div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
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
