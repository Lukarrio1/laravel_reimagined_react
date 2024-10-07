import React, { useEffect, useState } from "react";
import Link from "../../AMT/Components/Link";
import useRest from "../../AMT/Custom Hooks/useRest";
import useVerbiage from "../../AMT/Custom Hooks/useVerbiage";
import AnimationWrapper from "../../AMT/Wrappers/AnimationWrapper";
import useSettings from "../../AMT/Custom Hooks/useSettings";
import useErrors from "../../AMT/Custom Hooks/useErrors";
import useInput from "../../AMT/Custom Hooks/Html/useInput";
import useAuthDataLayer from "../../AMT/Data-layer/useAuthDataLayer";

const Login = () => {
  const { getSetting } = useSettings();
  const { login, getIsLoading, uuids } = useAuthDataLayer();
  const { getVerbiage } = useVerbiage(
    "uK95PIquDI8ODXyLrs3vQmeGs9kbUuG5qwlj52pDw5nI9v86A5"
  );

  const [creds, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { clearError, getError } = useErrors();

  const possibleErrors = ["invalid_credentials"];

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
      label: {
        className: "form-label",
        enabled: true,
        verbiage: {
          key: "email_field_title",
          uuid: "uK95PIquDI8ODXyLrs3vQmeGs9kbUuG5qwlj52pDw5nI9v86A5",
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
          uuid: "uK95PIquDI8ODXyLrs3vQmeGs9kbUuG5qwlj52pDw5nI9v86A5",
        },
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
                  login({ ...creds });
                }}
              >
                <div className="mb-3">{EmailHtml}</div>
                <div className="mb-3">{PasswordHtml}</div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={getIsLoading(uuids?.login_endpoint)}
                  >
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
