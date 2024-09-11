import React, { useEffect, useState } from "react";
import useNavigator from "../Laravel _Reimagined_Library/Custom Hooks/useNavigator";
import Link from "../Laravel _Reimagined_Library/Components/Link";
// import restClient from "../Laravel _Reimagined_Library";
import { useDispatch, useSelector } from "react-redux";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";

const Login = () => {
  const { getSetting } = useSettings();
  
  const { getVerbiage } = useVerbiage(
    "uK95PIquDI8ODXyLrs3vQmeGs9kbUuG5qwlj52pDw5nI9v86A5"
  );

  const [error, setError] = useState(null);
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { restClient } = useRest();

  const login = async () => {
    try {
      const { data } = await restClient(
        "xCggjsbTw94JlgbHDsaQ1j77nBKU08EKdSI0OiJPSoS9EFCyH8",
        {},
        { email, password }
      );
      setError(null);
      sessionStorage.setItem("bearerToken", data?.token);
      window.location.href = getSetting("redirect_to_after_login");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
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
              <div className="text-center text-danger">{error}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    {getVerbiage("email_field_title")}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ password, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    {getVerbiage("password_field_title")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ email, password: e.target.value })
                    }
                  />
                </div>
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
