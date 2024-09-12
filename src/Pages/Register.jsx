import React, { useState } from "react";
import Link from "../Laravel _Reimagined_Library/Components/Link";
import useRest from "../Laravel _Reimagined_Library/Custom Hooks/useRest";
import useVerbiage from "../Laravel _Reimagined_Library/Custom Hooks/useVerbiage";
import AnimationWrapper from "../Laravel _Reimagined_Library/Wrappers/AnimationWrapper";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useErrors from "../Laravel _Reimagined_Library/Custom Hooks/useErrors";

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

  const { getError, clearError } = useErrors();

  const register = async () => {
    clearError("name");
    clearError("email");
    clearError("password");
    clearError("confirm_password");
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
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    {getVerbiage("full_name_field_title")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, name: e.target.value })
                    }
                  />
                  {getError("name")?.length > 0 && (
                    <div className="text-left">
                      {getError("name")?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    {getVerbiage("email_field_title")}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, email: e.target.value })
                    }
                  />
                  {getError("email")?.length > 0 && (
                    <div className="text-left">
                      {getError("email")?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    {getVerbiage("password_field_title")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({ ...creds, password: e.target.value })
                    }
                  />
                  {getError("password")?.length > 0 && (
                    <div className="text-left">
                      {getError("password")?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    {getVerbiage("confirm_password_field_title")}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) =>
                      setCredentials({
                        ...creds,
                        confirm_password: e.target.value,
                      })
                    }
                  />
                  {getError("confirm_password")?.length > 0 && (
                    <div className="text-left">
                      {getError("confirm_password")?.map((er) => (
                        <div className="text-danger">{er}</div>
                      ))}
                    </div>
                  )}
                </div>
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
