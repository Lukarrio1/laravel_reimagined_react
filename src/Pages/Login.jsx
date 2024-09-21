import React, { useEffect, useState } from "react";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useErrors from "../Laravel _Reimagined_Library/Custom Hooks/useErrors";
import useInput from "../Laravel _Reimagined_Library/Custom Hooks/Html/useInput";

const Login = () => {
  const { getSetting } = useSettings();

  const { getVerbiage } = useVerbiage(
    "uK95PIquDI8ODXyLrs3vQmeGs9kbUuG5qwlj52pDw5nI9v86A5"
  );

  const [creds, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { restClient } = useRest();

  const { clearError, getError } = useErrors();

  const possibleErrors = ["invalid_credentials"];

  const login = async () => {
    clearError("invalid_credentials");
    const response = await restClient(
      "xCggjsbTw94JlgbHDsaQ1j77nBKU08EKdSI0OiJPSoS9EFCyH8",
      {},
      { ...creds }
    );
    if (response === null) return;
    const { data } = response;
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = getSetting("redirect_to_after_login");
  };

  useEffect(() => {
    return () => possibleErrors.forEach((pr) => clearError(pr));
  }, []);

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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setCredentials({
      ...creds,
      email,
      password,
    });
  }, [email, password]);

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
                  login();
                }}
              >
                <div className="mb-3">{EmailHtml}</div>
                <div className="mb-3">{PasswordHtml}</div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    {getVerbiage("login_button")}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer h5 bg-white">
              or{" "}
              <Link
                uuid={"FJisFM6Ur8GMDW5PDjM2lLO9KIzyW9LhRNGLGBwS6vxCI38Q7B"}
                className="btn btn-sm btn-default"
                enable_verbiage={{
                  enable: true,
                  verbiage_key: "register_nav_text",
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
